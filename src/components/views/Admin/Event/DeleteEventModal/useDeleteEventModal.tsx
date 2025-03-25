import eventServices from "@/services/event.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteEventModal = () => {
  const deleteEvent = async (id: string) => {
    const res = await eventServices.deleteEvent(id);
    return res;
  };

  const {
    mutate: mutateDeleteEvent,
    isPending: isPendingMutateDeleteEvent,
    isSuccess: isSuccessMutateDeleteEvent,
  } = useMutation({
    mutationFn: deleteEvent,
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
        description: "delete event successfully",
      });
    },
  });

  return {
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
  };
};

export default useDeleteEventModal;
