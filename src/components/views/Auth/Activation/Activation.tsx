import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface IProps {
  status: "success" | "failed";
}

function Activation(props: IProps) {
  const router = useRouter();
  const { status } = props;
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustration/success.svg"
              : "/images/illustration/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-bold text-danger-500">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-xl font-bold text-default-500">
          {status === "success"
            ? "Thank you for register account in Acara"
            : "Confirmation code is invalid"}
        </p>
        <Button
          className="mt-4 w-fit hover:bg-danger hover:text-white"
          variant="bordered"
          color="danger"
          onPress={() => router.push("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default Activation;
