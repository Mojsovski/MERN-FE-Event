import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useEvent() {
  const router = useRouter();
  const {
    currentLimit,
    currentPage,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();

  const getEvent = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&category=${currentCategory}&isOnline=${currentIsOnline}&isFeatured=${currentIsFeatured}&isPublish=true`;

    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: [
      "Events",
      currentPage,
      currentLimit,
      currentCategory,
      currentIsOnline,
      currentIsFeatured,
    ],
    queryFn: () => getEvent(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,
  };
}

export default useEvent;
