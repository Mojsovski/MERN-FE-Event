import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTicketTab = () => {
  const { query, isReady } = useRouter();

  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketByEventId(`${query.id}`);
    return data.data;
  };

  const {
    data: dataTicket,
    refetch: refetchdataTicket,
    isPending: isPendingTicket,
    isRefetching: isRefetchingTicket,
  } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketByEventId,
    enabled: isReady,
  });

  return {
    dataTicket,
    refetchdataTicket,
    isPendingTicket,
    isRefetchingTicket,
  };
};

export default useTicketTab;
