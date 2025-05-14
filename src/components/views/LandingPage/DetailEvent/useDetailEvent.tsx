import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { ICart, ITicket } from "@/types/Ticket";
import { defaultCart } from "./DetailEvent.constans";
import orderServices from "@/services/order.service";
import { addToast } from "@heroui/react";

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
    queryKey: ["Tickets"],
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

  // create order
  const createOrder = async () => {
    const { data } = await orderServices.addOrder(cart);
    return data.data;
  };

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: createOrder,
      onError: (error) => {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
          timeout: 100000,
        });
      },
      onSuccess: (result) => {
        const transactionToken = result.payment.token;
        (window as any).snap.pay(transactionToken);
      },
    });

  return {
    dataDetailEvent,
    dataTicket,
    dataTicketInCart,

    cart,
    handleAddToCart,
    handleChangeQuantity,

    mutateCreateOrder,
    isPendingCreateOrder,
  };
};

export default useDetailEvent;
