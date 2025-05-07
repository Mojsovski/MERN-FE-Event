import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { ICart, ITicket } from "@/types/Ticket";
import { defaultCart } from "./DetailEvent.constans";

const useDetailEvent = () => {
  const router = useRouter();

  //   get slug event
  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataDetailEvent } = useQuery({
    queryKey: ["EventBySlug"],
    queryFn: getEventBySlug,
    enabled: router.isReady,
  });

  // get ticket by event id
  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketByEventId(
      `${dataDetailEvent._id}`
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Ticket"],
    queryFn: getTicketByEventId,
    enabled: !!dataDetailEvent?._id,
  });

  // add to card
  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket);
    }
    return null;
  }, [dataTicket, cart]);

  const handleAddToCart = (ticket: string) => {
    setCart({
      events: dataDetailEvent._id as string,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  return {
    dataDetailEvent,
    dataTicket,
    dataTicketInCart,

    cart,
    handleAddToCart,
    handleChangeQuantity,
  };
};

export default useDetailEvent;
