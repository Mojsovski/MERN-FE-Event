import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/Admin/Banner";

function BannerAdminPage() {
  return (
    <DashboardLayout
      title="Banner"
      description="List of All Categores, create new category, and manage existing category"
      type="admin"
    >
      <Banner />
    </DashboardLayout>
  );
}

export default BannerAdminPage;
