import { Inter } from "next/font/google";
// import { ReactNode, useContext, useEffect } from "react";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";
// import Toaster from "../ui/Toaster";
// import { defaultToaster, ToasterContext } from "@/contexts/ToasterContext";

import { ToastProvider } from "@heroui/react";

interface IProps {
  children: ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function AppShell(props: IProps) {
  const { children } = props;
  // const { toaster, setToaster } = useContext(ToasterContext);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setToaster(defaultToaster);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [toaster]);

  return (
    <main className={cn(inter.className)}>
      {children}
      {/* {toaster.type !== "" && (
        <Toaster type={toaster.type} message={toaster.message} />
      )} */}
      <ToastProvider
        placement="top-right"
        toastOffset={10}
        toastProps={{
          radius: "md",
          color: "primary",
          variant: "flat",
          timeout: 3000,
          classNames: {
            closeButton:
              "opacity-100 absolute right-4 top-1/2 -translate-y-1/2 ",
          },
        }}
      />
    </main>
  );
}

export default AppShell;
