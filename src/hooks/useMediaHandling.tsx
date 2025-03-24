import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";

const useMediaHandling = () => {
  // upload  file
  const uploadFile = async (
    file: File,
    callback: (fileUrl: string) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: {
        data: { secure_url: fileUrl },
      },
    } = await uploadServices.uploadFile(formData);
    callback(fileUrl);
  };

  // delete file
  const deleteFile = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.deleteFile({ fileUrl });
    if (res.data.meta.status === 200) {
      callback();
    }
  };

  // mutate upload
  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadFile(variables.file, variables.callback),
      onError: (error) => {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      },
    });

  const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteFile(variables.fileUrl, variables.callback),
      onError: (error) => {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      },
    });

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
    callback: (fileUrl?: string) => void
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback,
      });
    }
  };

  // handle delete file
  const handleDeleteFile = (
    fileUrl: string | FileList | undefined,
    callback: () => void
  ) => {
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback });
    } else {
      callback();
    }
  };

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  };
};

export default useMediaHandling;
