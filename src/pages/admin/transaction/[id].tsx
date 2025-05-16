import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Admin/DetailTransaction";

function DetailTransactionAdminPage() {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Manage information for this transaction."
      type="admin"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
}

export default DetailTransactionAdminPage;
