import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  icon: yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddCategoryModal = () => {
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

  const preview = watch("icon");
  const fileUrl = getValues("icon");

  // handle upload category icon
  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("icon", fileUrl);
      }
    });
  };

  // handle delete category icon
  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  // handle delete category icon while modal closed
  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessMutateAddCategory,
  } = useMutation({
    mutationFn: addCategory,
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
        description: "add category successfully",
      });
      reset();
    },
  });

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    reset,
    handleAddCategory,
    handleSubmitForm,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,

    preview,
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleOnClose,
  };
};

export default useAddCategoryModal;
