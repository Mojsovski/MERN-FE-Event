import Image from "next/image";
import { Card, CardBody, Input, Button, Spinner } from "@heroui/react";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

function Register() {
  const {
    visiblePassword,
    handlevisiblePassword,
    control,
    handleRegister,
    handleSubmit,
    isPendingRegister,
    errors,
  } = useRegister();

  console.log(errors);

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
          width={300}
          height={300}
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
              <Link
                className="font-semibold text-danger-400"
                href="/auth/login"
              >
                Login here!
              </Link>
            </p>
          </div>
          {/* error message */}
          {errors.root && (
            <p className="font-medium text-danger ">{errors.root?.message}</p>
          )}
          {/* form register */}
          <form
            className={cn(
              "flex flex-col w-80 gap-4",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
            )}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Fullname"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.fullName !== undefined}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.userName !== undefined}
                  errorMessage={errors.userName?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.password ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
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
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  label="Password Confirmation"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                  endContent={
                    <button
                      className="focus:outline-none "
                      type="button"
                      onClick={() => handlevisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="pointer-events-none text-xl text-default-400 " />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                />
              )}
            />
            <Button color="danger" size="lg" type="submit">
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
