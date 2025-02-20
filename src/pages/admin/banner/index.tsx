import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

function BannerAdminPage() {
  return (
    <DashboardLayout title="Banner" description="Banner Admin" type="admin">
      <Dashboard />
    </DashboardLayout>
  );
}

export default BannerAdminPage;
