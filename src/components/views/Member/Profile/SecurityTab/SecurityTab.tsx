import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import useSecurityTab from "./useSecurityTab";
import { Controller } from "react-hook-form";

import { IProfile } from "@/types/Auth";

interface IProps {
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const SecurityTab = (props: IProps) => {
  const {
    controlUpdateSecurity,
    errorsUpdateSecurity,
    handleSubmitUpdateSecurity,
    handleUpdateSecurity,
    isPendingMutateUpdateSecurity,
  } = useSecurityTab();

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="  flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-xl font-bold">Security Tab</h1>
          <p className="text-small text-default-400">
            Manage security of this profile
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateSecurity(handleUpdateSecurity)}
        >
          <Controller
            name="oldPassword"
            control={controlUpdateSecurity}
            render={({ field }) => (
              <Input
                {...field}
                label="Old Password"
                variant="bordered"
                labelPlacement="outside"
                placeholder="input your old password"
                type="password"
                isInvalid={errorsUpdateSecurity.oldPassword !== undefined}
                errorMessage={errorsUpdateSecurity.oldPassword?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={controlUpdateSecurity}
            render={({ field }) => (
              <Input
                {...field}
                label="New Password"
                variant="bordered"
                labelPlacement="outside"
                placeholder="input your new password"
                type="password"
                isInvalid={errorsUpdateSecurity.password !== undefined}
                errorMessage={errorsUpdateSecurity.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={controlUpdateSecurity}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm Password"
                variant="bordered"
                labelPlacement="outside"
                placeholder="input your confirm password"
                type="password"
                isInvalid={errorsUpdateSecurity.confirmPassword !== undefined}
                errorMessage={errorsUpdateSecurity.confirmPassword?.message}
              />
            )}
          />

          <Button
            color="danger"
            className="mt-1 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUpdateSecurity}
          >
            {isPendingMutateUpdateSecurity ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default SecurityTab;
