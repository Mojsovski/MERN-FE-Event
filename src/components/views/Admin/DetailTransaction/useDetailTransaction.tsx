import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useDetailTransaction() {
  const router = useRouter();

  //   get trabsaction by id
  const getOrderById = async () => {
    const { data } = await orderServices.getOrderById(`${router.query.id}`);
    return data.data;
  };

  const { data: dataTransaction } = useQuery({
    queryKey: ["Transaction"],
    queryFn: getOrderById,
    enabled: router.isReady,
  });

  //   get event by id
  const getEventById = async () => {
    const { data } = await eventServices.getEventById(
      `${dataTransaction?.events}`
    );
    return data.data;
  };

  const { data: dataDetailEvent } = useQuery({
    queryKey: ["EventById"],
    queryFn: getEventById,
    enabled: !!dataTransaction?.events,
  });

  // get ticket by  id
  const getTicketById = async () => {
    const { data } = await ticketServices.getTicketById(
      `${dataTransaction?.ticket}`
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketById,
    enabled: !!dataTransaction?.ticket,
  });
  return {
    dataDetailEvent,
    dataTransaction,
    dataTicket,
  };
}

export default useDetailTransaction;
