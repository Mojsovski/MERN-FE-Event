import Image from "next/image";
import { Card, CardBody, Input, Button, Spinner } from "@heroui/react";
import Link from "next/link";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

function Login() {
  const {
    visiblePassword,
    toggleVisiblePassword,
    control,
    handleLogin,
    handleSubmit,
    isPendingLogin,
    errors,
  } = useLogin();

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
            <h2 className="text-xl font-bold text-danger-500">Login</h2>
            <p className="text-small">
              Don&apos;t have an account? &nbsp;
              <Link
                className="font-semibold text-danger-400"
                href="/auth/register"
              >
                Register here!
              </Link>
            </p>
          </div>
          {/* error message */}
          {errors.root && (
            <p className="text-sm font-medium text-danger ">
              {errors.root?.message}
            </p>
          )}
          {/* form Login */}
          <form
            className={cn(
              "flex flex-col w-80 gap-4",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Email / Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="focus:outline-none "
                      type="button"
                      onClick={toggleVisiblePassword}
                    >
                      {visiblePassword ? (
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
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
