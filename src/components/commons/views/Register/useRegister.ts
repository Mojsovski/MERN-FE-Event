import { useState } from "react";
const useRegister = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const handlevisiblePassword = (key: "password" | "passwordConfirmation") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };
  return { visiblePassword, handlevisiblePassword };
};

export default useRegister;
