import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Member/Profile";

function ProfileMemberPage() {
  return (
    <DashboardLayout
      title="Profile"
      description="Manage your profile & security"
      type="member"
    >
      <Profile />
    </DashboardLayout>
  );
}

export default ProfileMemberPage;
