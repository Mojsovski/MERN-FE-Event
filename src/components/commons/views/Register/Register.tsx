import Image from "next/image";
import { Card, CardBody, Input, Button } from "@heroui/react";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { visiblePassword, handlevisiblePassword } = useRegister();
  return (
    <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-10 lg:gap-20">
      <div className="flex w-full lg:w-1/3 flex-col justify-center items-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          className="w-2/3 lg:w-full"
          src="/images/illustration/login.svg"
          alt="login"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody className="p-8 flex flex-col gap-5 ">
          <div className="">
            <h2 className="text-xl font-bold text-danger-500">
              Create Account
            </h2>
            <p className="text-small">
              Have an account? &nbsp;
              <Link className="font-semibold text-danger-400" href="/login">
                Login here!
              </Link>
            </p>
          </div>
          <form className="flex flex-col w-80 gap-4">
            <Input
              type="text"
              label="Fullname"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type="text"
              label="Username"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type="email"
              label="Email"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              type={visiblePassword.password ? "text" : "password"}
              label="Password"
              variant="bordered"
              autoComplete="off"
              endContent={
                <button
                  className="focus:outline-none "
                  type="button"
                  onClick={() => handlevisiblePassword("password")}
                >
                  {visiblePassword.password ? (
                    <FaEye className="pointer-events-none text-xl text-default-400 " />
                  ) : (
                    <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                  )}
                </button>
              }
            />
            <Input
              type={visiblePassword.passwordConfirmation ? "text" : "password"}
              label="Password Confirmation"
              variant="bordered"
              autoComplete="off"
              endContent={
                <button
                  className="focus:outline-none "
                  type="button"
                  onClick={() => handlevisiblePassword("passwordConfirmation")}
                >
                  {visiblePassword.passwordConfirmation ? (
                    <FaEye className="pointer-events-none text-xl text-default-400 " />
                  ) : (
                    <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                  )}
                </button>
              }
            />
            <Button color="danger" size="lg" type="submit">
              Register
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
