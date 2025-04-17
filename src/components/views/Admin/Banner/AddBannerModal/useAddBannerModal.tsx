import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  isShow: yup.string().required("Please input is show"),
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useAddBannerModal = () => {
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

  const preview = watch("image");
  const fileUrl = getValues("image");

  // handle upload banner image
  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  // handle delete banner image
  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  // handle delete banner image while modal closed
  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addBanner = async (payload: IBanner) => {
    const res = await bannerServices.addBanner(payload);
    return res;
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingMutateAddBanner,
    isSuccess: isSuccessMutateAddBanner,
  } = useMutation({
    mutationFn: addBanner,
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
        description: "add banner successfully",
      });
      reset();
    },
  });

  const handleAddBanner = (data: IBanner) => mutateAddBanner(data);

  return {
    control,
    errors,
    reset,
    handleAddBanner,
    handleSubmitForm,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
  };
};

export default useAddBannerModal;
