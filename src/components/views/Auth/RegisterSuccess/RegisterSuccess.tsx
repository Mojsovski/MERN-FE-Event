import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

function RegisterSuccess() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 p-4">
        <div className="flex flex-col items-center justify-center gap-10">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={180}
            height={180}
          />
          <Image
            // className="w-2/3 lg:w-full"
            src="/images/illustration/email-send.svg"
            alt="success"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-bold text-danger-500">
            Create Account Success
          </h1>
          <p className="text-xl font-bold text-default-500">
            check your email for account activation
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
    </>
  );
}

export default RegisterSuccess;
