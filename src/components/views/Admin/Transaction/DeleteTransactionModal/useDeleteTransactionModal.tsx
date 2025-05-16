import orderServices from "@/services/order.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteTransactionModal = () => {
  const deleteTransaction = async (id: string) => {
    const res = await orderServices.deleteOrder(id);
    return res;
  };

  const {
    mutate: mutateDeleteTransaction,
    isPending: isPendingMutateDeleteTransaction,
    isSuccess: isSuccessMutateDeleteTransaction,
  } = useMutation({
    mutationFn: deleteTransaction,
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
        description: "delete transaction successfully",
      });
    },
  });

  return {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessMutateDeleteTransaction,
  };
};

export default useDeleteTransactionModal;
