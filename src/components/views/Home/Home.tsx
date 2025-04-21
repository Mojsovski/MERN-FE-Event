import useNavbarLayout from "@/components/layouts/LandingPageLayout/NavbarLayout/useNavbarLayout";

function Home() {
  const { dataProfile } = useNavbarLayout();
  return (
    <div>
      <div>Home</div>
    </div>
  );
}

export default Home;
