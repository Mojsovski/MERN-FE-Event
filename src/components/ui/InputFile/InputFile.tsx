import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useId, useRef } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface IProps {
  className?: string;
  errorMessage?: string;
  isDeleting?: boolean;
  isDropable?: boolean;
  isInvalid?: boolean;
  isUploading?: boolean;
  name: string;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  preview?: string;
  label?: ReactNode;
}

const InputFile = (props: IProps) => {
  const {
    className,
    errorMessage,
    isDropable = false,
    isInvalid,
    isUploading,
    isDeleting,
    name,
    onUpload,
    onDelete,
    preview,
    label,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  return (
    <div>
      {label}
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounder-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-danger-500": isInvalid }
        )}
      >
        {/* if preview */}
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image
                fill
                src={preview}
                alt="image"
                className="!relative mb-2 w-1/2"
              />
            </div>
            <Button
              disabled={isDeleting}
              onPress={onDelete}
              isIconOnly
              className="absolute right-2 top-2 flex size-9 items-center justify-center bg-danger-100"
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <CiTrash className="size-5 text-danger-500" />
              )}
            </Button>
          </div>
        )}
        {/* if not preview & uploading */}
        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2 flex flex-col items-center justify-center">
              <CiSaveUp2 className="mb-2 size-10 text-gray-500  " />
              <p className="text-center text-sm font-semibold text-gray-400">
                {isDropable
                  ? "Drag and drop or click to upload file here"
                  : "Click to upload file here"}
              </p>
            </div>
          </div>
        )}
        {/* loading Spinner */}
        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner color="danger" />
          </div>
        )}
        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>
      {isInvalid && (
        <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
