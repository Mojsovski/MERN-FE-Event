import categoryServices from "@/services/category.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategoryModal = () => {
  const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);
    return res;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingMutateDeleteCategory,
    isSuccess: isSuccessMutateDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
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
        description: "delete category successfully",
      });
    },
  });

  return {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  };
};

export default useDeleteCategoryModal;
