// import { useContext, useState } from "react";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
// import { ToasterContext } from "@/contexts/ToasterContext";
import { addToast } from "@heroui/react";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your fullname"),
  userName: yup.string().required("Please input your username"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input your email"),
  password: yup
    .string()
    .min(8, "Minimal 8 Character")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password not match")
    .required("Please input your password confirmation"),
});

const useRegister = () => {
  // const { setToaster } = useContext(ToasterContext);
  const router = useRouter();

  // visible password on register page
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handlevisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  // validation register form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error) => {
      // setToaster({
      //   type: "error",
      //   message: error.message,
      // });
      addToast({
        color: "danger",
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: () => {
      reset();
      router.push("/auth/register/success");

      // setToaster({
      //   type: "success",
      //   message: "Register success",
      // });
      addToast({
        color: "success",
        title: "Success",
        description: "Register successfully",
      });
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);
  return {
    visiblePassword,
    handlevisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
