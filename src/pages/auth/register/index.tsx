import Register from "@/components/views/Register/Register";
import AuthLayout from "@/components/layouts/AuthLayout";

function RegisterPage() {
  return (
    <AuthLayout title="Register Page">
      <Register />
    </AuthLayout>
  );
}

export default RegisterPage;
