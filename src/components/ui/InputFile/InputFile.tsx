import { cn } from "@/utils/cn";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface IProps {
  name: string;
  className?: string;
  isDropable?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

const InputFile = (props: IProps) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const {
    className,
    errorMessage,
    isDropable = false,
    isInvalid,
    name,
    onChange,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setUploadedImage(e.dataTransfer?.files?.[0] || null);
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedImage(files[0]);
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <div>
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounder-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-danger-500": isInvalid }
        )}
      >
        {uploadedImage ? (
          <div className="flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image
                fill
                src={URL.createObjectURL(uploadedImage)}
                alt="image"
                className="!relative mb-2 w-1/2"
              />
              <div className="">
                <p className="text-center text-sm font-semibold text-gray-500 break-words">
                  {uploadedImage.name}
                </p>
              </div>
            </div>
          </div>
        ) : (
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
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          name={name}
          onChange={handleOnChange}
        />
      </label>
      {isInvalid && (
        <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
