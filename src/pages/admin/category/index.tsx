import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

function AdminCategoryPage() {
  return (
    <DashboardLayout
      title="Category"
      description="List of All Categores, create new category, and manage existing category"
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
}

export default AdminCategoryPage;
