import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import { convertTime } from "@/utils/date";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface IProps {
  event?: IEvent;
  className?: string;
  key?: string;
  isLoading?: boolean;
}

const CardEvent = (props: IProps) => {
  const { event, className, key, isLoading } = props;
  return (
    <Card
      href={`/event/${event?.slug}`}
      key={key}
      isPressable
      as={Link}
      className={cn(className, "cursor-pointer")}
    >
      {!isLoading ? (
        <Fragment>
          <CardBody>
            <Image
              alt="cover"
              width={1920}
              height={1080}
              className="aspect-video w-full rounded-lg object-cover"
              src={`${event?.banner}`}
            ></Image>
          </CardBody>
          <CardFooter className="flex flex-col items-baseline pt-0 ">
            <h2 className="line-clamp-1 text-lg font-semibold text-danger ">
              {event?.name}
            </h2>
            <p className="mb-2 line-clamp-2 text-left">{event?.description}</p>
            <p className="text-foreground-500">
              {convertTime(`${event?.startDate}`)}
            </p>
          </CardFooter>
        </Fragment>
      ) : (
        <Fragment>
          <CardBody>
            <Skeleton className="rounded-lg aspect-video w-full bg-default-300" />
          </CardBody>
          <CardFooter className="flex flex-col items-baseline pt-0 ">
            <Skeleton className="mb-2 h-4 w-4/5 rounded-lg" />
            <Skeleton className="mb-4 h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-2/5 rounded-lg" />
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default CardEvent;
