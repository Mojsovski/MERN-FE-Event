import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  refetchBanner: () => void;
  onOpenChange: () => void;
}

const AddBannerModal = (props: IProps) => {
  const { isOpen, onClose, refetchBanner, onOpenChange } = props;
  const {
    control,
    errors,
    handleOnClose,
    handleAddBanner,
    handleSubmitForm,
    handleUploadImage,
    handleDeleteImage,

    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,
  } = useAddBannerModal();

  const disabledSubmit =
    isPendingMutateAddBanner ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  useEffect(() => {
    if (isSuccessMutateAddBanner) {
      onClose();
      refetchBanner();
    }
  }, [isSuccessMutateAddBanner]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <div className="flex flex-col gap-2">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Name"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.title !== undefined}
                      errorMessage={errors.title?.message}
                    />
                  )}
                />
                <Controller
                  name="isShow"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Show / Hide"
                      variant="bordered"
                      isInvalid={errors.isShow !== undefined}
                      errorMessage={errors.isShow?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true">Show</SelectItem>
                      <SelectItem key="false">Hide</SelectItem>
                    </Select>
                  )}
                />
              </div>
              <p className="text-sm font-bold">Image</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    onDelete={() => handleDeleteImage(onChange)}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                    isDropable
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="danger" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddBanner ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
