import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

interface IErrorResponseData {
  data: {
    name: string;
  };
}

const onErrorHandler = (error: Error) => {
  const { response } = error as AxiosError;
  const res = response?.data as IErrorResponseData;

  if (response && res?.data?.name === "TokenExpiredError") {
    return signOut();
  }
};

export { onErrorHandler };
