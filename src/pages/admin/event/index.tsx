import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

function AdminEventPage() {
  return (
    <DashboardLayout
      title="Event"
      description="List of all event, create new event, and manage existing event"
      type="admin"
    >
      <Event />
    </DashboardLayout>
  );
}

export default AdminEventPage;
