import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";
import InputFile from "@/components/ui/InputFile";

interface IProps {
  currentIcon: string;
}

const CoverTab = (props: IProps) => {
  const { currentIcon } = props;
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="  flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-xl font-bold">Event Icon </h1>
          <p className="text-small text-default-400">Manage banner of event</p>
        </div>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-default-700">
              Current Banner
            </p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="icon" fill className="!relative" />
            </Skeleton>
          </div>
          <InputFile
            name="icon"
            isDropable
            label={
              <p className="text-sm font-medium text-default-700 mb-2 text">
                Upload New Banner
              </p>
            }
          />
          <Button
            color="danger"
            className="mt-1 disabled:bg-default-500"
            type="submit"
          >
            Save
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default CoverTab;
