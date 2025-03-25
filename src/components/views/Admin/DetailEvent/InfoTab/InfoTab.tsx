import { IEvent } from "@/types/Event";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";

interface IProps {
  dataEvent: IEvent;
}

const InfoTab = (props: IProps) => {
  const { dataEvent } = props;
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="  flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-xl font-bold">Event Icon </h1>
          <p className="text-small text-default-400">
            Manage information of this event
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Input
              type="text"
              className="mt-2"
              label="Name"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataEvent?.name}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
            <Textarea
              type="text"
              className="mt-2"
              label="Description"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataEvent?.description}
            />
          </Skeleton>
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

export default InfoTab;
