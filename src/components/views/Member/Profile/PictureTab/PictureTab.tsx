import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import InputFile from "@/components/ui/InputFile";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";
import usePictureTab from "./usePictureTab";

interface IProps {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = (props: IProps) => {
  const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdatePicture,

    preview,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/3">
      <CardHeader className="  flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-xl font-bold">Picture Profile</h1>
          <p className="text-small text-default-400">
            Manage picture of your profile
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-default-700">
              Current Picture
            </p>

            <Skeleton
              isLoaded={!!currentPicture}
              className="aspect-square rounded-lg w-full"
            >
              <Avatar
                src={currentPicture}
                alt="profilePicture"
                showFallback
                className="aspect-square h-full w-full "
              />
            </Skeleton>
          </div>
          <Controller
            name="profilePicture"
            control={controlUpdatePicture}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeletePicture(onChange)}
                onUpload={(files) => handleUploadPicture(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                errorMessage={errorsUpdatePicture.profilePicture?.message}
                isDropable
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Picture
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            color="danger"
            className="mt-1 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
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

export default PictureTab;
