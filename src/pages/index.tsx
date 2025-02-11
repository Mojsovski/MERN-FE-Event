import { Slider } from "@heroui/react";
import PageHead from "@/components/commons/PageHead";

export default function Home() {
  return (
    <>
      <PageHead title="Home" />
      <div
        className={` grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <div className="flex flex-col gap-6 w-full max-w-md">
          <Slider
            className="max-w-md"
            defaultValue={1}
            label="Temperature"
            maxValue={10}
            minValue={0}
            step={1}
          />
        </div>
      </div>
    </>
  );
}
