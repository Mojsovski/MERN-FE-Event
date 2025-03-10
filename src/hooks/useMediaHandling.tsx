import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";

const useMediaHandling = () => {
  // upload  category icon
  const uploadIcon = async (
    file: File,
    callback: (fileUrl: string) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: {
        data: { secure_url: icon },
      },
    } = await uploadServices.uploadFile(formData);
    callback(icon);
  };

  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadIcon(variables.file, variables.callback),
      onError: (error) => {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      },
    });

  // delete category icon
  const deleteIcon = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.deleteFile({ fileUrl });
    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteIcon(variables.fileUrl, variables.callback),
      onError: (error) => {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      },
    });

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  };
};

export default useMediaHandling;
