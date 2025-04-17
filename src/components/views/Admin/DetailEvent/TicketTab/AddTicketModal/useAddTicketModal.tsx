import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  price: yup.string().required("Please input price"),
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  quantity: yup.string().required("Please input price"),
});

const useAddTicketModal = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.addTicket(payload);
    return res;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingMutateAddTicket,
    isSuccess: isSuccessMutateAddTicket,
  } = useMutation({
    mutationFn: addTicket,
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
        description: "add ticket successfully",
      });
      reset();
    },
  });

  const handleAddTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateAddTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleAddTicket,
    handleSubmitForm,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
  };
};

export default useAddTicketModal;
