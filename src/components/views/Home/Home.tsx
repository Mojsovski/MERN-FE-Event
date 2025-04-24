import HomeSlider from "./HomeSlider";
import useHome from "./useHome";

function Home() {
  const { dataBanners, isLoadingBanners } = useHome();
  return (
    <div>
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanners}
      />
    </div>
  );
}

export default Home;
