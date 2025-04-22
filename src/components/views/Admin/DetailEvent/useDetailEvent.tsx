import { IEvent, IEventForm } from "@/types/Event";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { addToast, DateValue } from "@heroui/react";
import eventServices from "@/services/event.service";
import { toDateStandard } from "@/utils/date";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(`${query.id}`);
    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: getEventById,
    enabled: isReady,
  });

  const updateEvent = async (payload: IEvent) => {
    const { data } = await eventServices.updateEvent(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: (payload: IEvent) => updateEvent(payload),
    onError: (error) => {
      addToast({
        color: "danger",
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: () => {
      refetchEvent();
      addToast({
        color: "success",
        title: "Success",
        description: "update event successfully",
      });
    },
  });

  const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

  const handleUpdateInfo = (data: IEventForm) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      endDate: toDateStandard(data.endDate as DateValue),
    };
    mutateUpdateEvent(payload);
  };

  const handleUpdateLocation = (data: IEventForm) => {
    const payload = {
      ...data,
      location: {
        address: `${data.address}`,
        region: `${data.region}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
    };
    mutateUpdateEvent(payload);
  };

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["DefaultRegion"],
      queryFn: () => eventServices.getRegencyById(dataEvent?.location?.region),
      enabled: !!dataEvent?.location?.region,
    });

  return {
    dataEvent,
    dataDefaultRegion,
    handleUpdateInfo,
    handleUpdateLocation,
    handleUpdateEvent,
    isPendingMutateUpdateEvent,
    isPendingDefaultRegion,
    isSuccessMutateUpdateEvent,
  };
};

export default useDetailEvent;
