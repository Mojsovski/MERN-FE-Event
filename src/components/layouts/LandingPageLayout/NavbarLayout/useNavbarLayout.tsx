import { DELAY, LIMIT_BANNER, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

function useNavbarLayout() {
  const [search, setSearch] = useState("");
  const debounce = useDebounce();
  const router = useRouter();
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: router.isReady,
  });

  // get event card list
  const getSearchEvents = async () => {
    const eventParams = `search=${search}&limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}&isPublish=true`;
    const res = await eventServices.getEvents(eventParams);
    const { data } = res;
    return data;
  };

  const {
    data: dataSearchEvent,
    isLoading: isLoadingSearchEvent,
    isRefetching: isRefetchingSearchEvent,
  } = useQuery({
    queryKey: ["SearchEvent", search],
    queryFn: getSearchEvents,
    enabled: !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    dataProfile,
    handleSearch,
    dataSearchEvent,
    isLoadingSearchEvent,
    isRefetchingSearchEvent,
    search,
    setSearch,
  };
}

export default useNavbarLayout;
