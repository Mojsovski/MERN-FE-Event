import { IEvent, IEventForm } from "@/types/Event";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { addToast } from "@heroui/react";
import eventServices from "@/services/event.service";
import { toDateStandard } from "@/utils/date";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();

  const getEventById = async (id: string) => {
    const { data } = await eventServices.getEventById(id);
    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: () => getEventById(`${query.id}`),
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
      startDate: data.startDate ? toDateStandard(data.startDate) : "",
      endDate: data.endDate ? toDateStandard(data.endDate) : "",
    };
    mutateUpdateEvent(payload);
  };

  const handleUpdateLocation = (data: IEventForm) => {
    const payload = {
      isOnline: Boolean(data.isOnline),
      location: {
        address: `${data.address}`,
        region: `${data.region}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
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
