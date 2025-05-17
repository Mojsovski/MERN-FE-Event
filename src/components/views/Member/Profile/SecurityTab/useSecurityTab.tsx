import authServices from "@/services/auth.service";
import { ISecurity } from "@/types/Auth";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateSecurity = yup.object().shape({
  oldPassword: yup.string().required("Please input your old password"),
  password: yup.string().required("Please input your new password"),
  confirmPassword: yup
    .string()
    .required("Please input confirm password")
    .oneOf(
      [yup.ref("password")],
      "new password & confirm password must same" // validate when password & confirm password not same
    ),
});

const useSecurityTab = () => {
  const {
    control: controlUpdateSecurity,
    handleSubmit: handleSubmitUpdateSecurity,
    formState: { errors: errorsUpdateSecurity },
    reset: resetUpdateSecurity,
    setValue: setValueUpdateSecurity,
  } = useForm({
    resolver: yupResolver(schemaUpdateSecurity),
  });

  const updateSecurity = async (payload: ISecurity) => {
    const { data } = await authServices.updatePassword(payload);
    return data;
  };

  const {
    mutate: mutateUpdateSecurity,
    isPending: isPendingMutateUpdateSecurity,
  } = useMutation({
    mutationFn: (payload: ISecurity) => updateSecurity(payload),
    onError: (error: any) => {
      let description = error.message;

      if (error?.response?.status === 404) {
        description = "Old password not match with current password";
      }

      addToast({
        color: "danger",
        title: "Error",
        description,
      });
    },
    onSuccess: () => {
      resetUpdateSecurity();
      setValueUpdateSecurity("oldPassword", "");
      setValueUpdateSecurity("password", "");
      setValueUpdateSecurity("confirmPassword", "");
      addToast({
        color: "success",
        title: "Success",
        description: "update password successfully",
      });
    },
  });

  const handleUpdateSecurity = (data: ISecurity) => mutateUpdateSecurity(data);

  return {
    controlUpdateSecurity,
    errorsUpdateSecurity,
    handleSubmitUpdateSecurity,
    handleUpdateSecurity,
    isPendingMutateUpdateSecurity,
  };
};

export default useSecurityTab;
