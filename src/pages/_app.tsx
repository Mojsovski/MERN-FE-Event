import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";
import { Inter } from "next/font/google";
import { cn } from "@/utils/cn";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <main
        className={cn(
          inter.className,
          "py-10 lg:py-0 flex flex-col min-h-screen min-w-full items-center justify-center gap-10"
        )}
      >
        <Component {...pageProps} />
      </main>
    </HeroUIProvider>
  );
}
