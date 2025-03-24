import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { ICategory } from "@/types/Category";
import { addToast, DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  isOnline: yup.string().required("Please select online or offline "),
  description: yup.string().required("Please input description"),
  region: yup.string().required("Please select region"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
  latitude: yup.string().required("Please select latitude coordinate"),
  longitude: yup.string().required("Please select longitude coordinate"),
});

const useAddCategoryModal = () => {
  const debounce = useDebounce();
  const router = useRouter();
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  // handle upload banner event
  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  // handle delete banner event
  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  // handle delete banner event while modal closed
  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  // fetch category list to autocomplete form
  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  // fetch region by regency
  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  // handle search region
  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const addEvent = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      addToast({
        color: "danger",
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: () => {
      addToast({
        color: "success",
        title: "Success",
        description: "add event successfully",
      });
      reset();
    },
  });

  const handleAddEvent = (data: ICategory) => mutateAddEvent(data);

  return {
    control,
    errors,
    reset,
    handleAddEvent,
    handleSubmitForm,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,

    dataCategory,
    dataRegion,
    handleSearchRegion,
    searchRegency,
  };
};

export default useAddCategoryModal;
