import { IBanner } from "@/types/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "@heroui/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface IProps {
  banners?: IBanner[];
  isLoadingBanners: boolean;
}
const HomeSlider = (props: IProps) => {
  const { banners, isLoadingBanners } = props;

  return (
    <div className="mx-6 mb-6 h-[25vw] lg:mx-0 lg:mb-8">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{ dynamicBullets: true, clickable: true }}
          spaceBetween={30}
          loop
          modules={[Autoplay, Pagination]}
          className="h-full w-full"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
        >
          {banners?.map((banners: IBanner) => (
            <SwiperSlide key={banners._id}>
              <Image
                src={`${banners.image}`}
                alt={`${banners.title}`}
                width={1920}
                height={400}
                className="h-[80%] w-full rounded-2xl object-cover lg:h[90%]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="h-[90%] w-full rounded-2xl" />
      )}
    </div>
  );
};

export default HomeSlider;
