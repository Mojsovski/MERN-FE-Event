import { Skeleton } from "@heroui/react";
import HomeCardList from "./HomeCardList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";
import HomeCategoryList from "./HomeCategoryList";

function Home() {
  const {
    dataBanners,
    dataCategories,
    dataFeaturedEvents,
    dataLatestEvents,

    isLoadingBanners,
    isLoadingCategories,
    isLoadingFeaturedEvents,
    isLoadingLatestEvents,
  } = useHome();
  return (
    <div>
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanners}
      />
      <HomeCardList
        title="Featured Event"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingFeaturedEvents}
      />
      <Skeleton
        isLoaded={!isLoadingBanners}
        className="mb-8 h-[20vw] w-full rounded-2xl"
      >
        <Image
          src={dataBanners && dataBanners?.data[1]?.image}
          alt="banner"
          className="h-[20vw] w-full rounded-2xl object-cover"
          width={1200}
          height={400}
        />
      </Skeleton>
      <HomeCardList
        title="Latest Event"
        events={dataLatestEvents?.data}
        isLoading={isLoadingLatestEvents}
      />
      <HomeCategoryList
        categories={dataCategories?.data}
        isLoading={isLoadingCategories}
      />
    </div>
  );
}

export default Home;
