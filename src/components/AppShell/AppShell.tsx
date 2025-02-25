import { Inter } from "next/font/google";
import { ReactNode, useContext, useEffect } from "react";
import { cn } from "@/utils/cn";
import Toaster from "../ui/Toaster";
import { defaultToaster, ToasterContext } from "@/contexts/ToasterContext";

interface IProps {
  children: ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function AppShell(props: IProps) {
  const { children } = props;
  const { toaster, setToaster } = useContext(ToasterContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToaster(defaultToaster);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [toaster]);

  return (
    <main className={cn(inter.className)}>
      {children}
      {toaster.type !== "" && (
        <Toaster type={toaster.type} message={toaster.message} />
      )}
    </main>
  );
}

export default AppShell;
