import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

function EventAdminPage() {
  return (
    <DashboardLayout title="Event" description="Event Admin" type="admin">
      <Dashboard />
    </DashboardLayout>
  );
}

export default EventAdminPage;
