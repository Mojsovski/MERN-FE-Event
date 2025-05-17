import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface IProps {
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: IProps) => {
  const { dataProfile, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("fullName", `${dataProfile?.fullName}`);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="  flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-xl font-bold">User Information</h1>
          <p className="text-small text-default-400">
            Manage information of this profile
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
            <Input
              value={dataProfile?.email}
              label="Email"
              variant="flat"
              labelPlacement="outside"
              type="text"
              disabled
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.userName} className="rounded-lg">
            <Input
              value={dataProfile?.userName}
              label="Username"
              variant="flat"
              labelPlacement="outside"
              type="text"
              disabled
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
            <Input
              value={dataProfile?.role}
              label="Role"
              variant="flat"
              labelPlacement="outside"
              type="text"
              disabled
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.fullName} className="rounded-lg">
            <Controller
              name="fullName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Full name"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="input your fullname"
                  type="text"
                  isInvalid={errorsUpdateInfo.fullName !== undefined}
                  errorMessage={errorsUpdateInfo.fullName?.message}
                />
              )}
            />
          </Skeleton>

          <Button
            color="danger"
            className="mt-1 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataProfile?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
