import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

function MemberDetailTransactionPage() {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Manage information for this transaction."
      type="member"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
}

export default MemberDetailTransactionPage;
