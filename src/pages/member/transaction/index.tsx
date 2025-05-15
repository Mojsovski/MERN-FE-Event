import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";
import Transaction from "@/components/views/Member/Transaction";

function TransactionMemberPage() {
  return (
    <DashboardLayout
      title="Transaction"
      description="List of all transaction"
      type="member"
    >
      <Transaction />
    </DashboardLayout>
  );
}

export default TransactionMemberPage;
