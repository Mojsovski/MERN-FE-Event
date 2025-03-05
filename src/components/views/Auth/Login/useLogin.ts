// import { useContext, useState } from "react";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
// import { ToasterContext } from "@/contexts/ToasterContext";
import { addToast } from "@heroui/react";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your email or username"),
  password: yup.string().required("Please input your password"),
});

const useLogin = () => {
  // const { setToaster } = useContext(ToasterContext);
  const router = useRouter();

  // visible password on register page
  const [visiblePassword, setVisiblePassword] = useState(false);

  const toggleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  // validation login form
  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });
    if (result?.error && result?.status === 401) {
      throw new Error("Email or username not match with your password");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
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
      router.push(callbackUrl);

      // setToaster({
      //   type: "success",
      //   message: "Login success",
      // });

      addToast({
        color: "success",
        title: "Success",
        description: "Login successfully",
      });
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);
  return {
    visiblePassword,
    toggleVisiblePassword,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
