import { LIMIT_BANNER, PAGE_DEFAULT } from "@/constants/list.constants";
import bannerServices from "@/services/banner.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  // get carousel banner
  const getBanners = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;

    const res = await bannerServices.getBanners(params);
    const { data } = res;
    return data;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
    enabled: true,
  });

  // get event card list
  const getEvents = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const eventParams = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}&isPublish=true`;

  const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
    useQuery({
      queryKey: ["FeaturedEvents"],
      queryFn: () => getEvents(`${eventParams}&isFeatured=true`),
    });

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["LatestEvents"],
      queryFn: () => getEvents(eventParams),
    }
  );

  return {
    dataBanners,
    dataFeaturedEvents,
    dataLatestEvents,

    isLoadingBanners,
    isLoadingFeaturedEvents,
    isLoadingLatestEvents,
  };
};

export default useHome;
