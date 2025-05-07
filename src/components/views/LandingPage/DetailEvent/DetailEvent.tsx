import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock } from "react-icons/fa";
import { convertTime } from "@/utils/date";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { ITicket } from "@/types/Ticket";
import DetailEventTicket from "./DetailEventTicket";
import DetailEventCart from "./DetailEventCart";
import Script from "next/script";
import env from "@/config/env";

function DetailEvent() {
  const {
    dataDetailEvent,
    dataTicket,
    dataTicketInCart,
    cart,
    handleAddToCart,
    handleChangeQuantity,
    mutateCreateOrder,
    isPendingCreateOrder,
  } = useDetailEvent();
  return (
    <div className="px-8 md:px-0  ">
      <Script
        src={env.MIDTRANS_SNAP_URL}
        data-client-key={env.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <Skeleton
        isLoaded={!!dataDetailEvent?.name}
        className="h-9 w-1/4 rounded-lg"
      >
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataDetailEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <section className=" flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6 flex flex-col gap-2">
          <Skeleton
            isLoaded={!!dataDetailEvent?.name}
            className="rounded-lg w-1/2"
          >
            <h1 className="text-2xl font-semibold text-danger">
              {dataDetailEvent?.name}
            </h1>
          </Skeleton>
          <div className="flex flex-col gap-1">
            <Skeleton
              isLoaded={
                !!dataDetailEvent?.startDate && !!dataDetailEvent?.endDate
              }
              className="h-5 rounded-lg w-96"
            >
              <div className="flex items-center gap-2 text-foreground-500">
                <FaClock width={16} />
                <p>
                  {convertTime(dataDetailEvent?.startDate)}-
                  {convertTime(dataDetailEvent?.endDate)}
                </p>
              </div>
            </Skeleton>
            <Skeleton
              isLoaded={
                !!dataDetailEvent?.isOnline ||
                !!dataDetailEvent?.location?.address
              }
              className="h-5 rounded-lg w-96"
            >
              <div className="flex items-center gap-2 text-foreground-500">
                <FaLocationDot width={16} />
                <p>
                  {dataDetailEvent?.isOnline ? "Online" : "Offline"}{" "}
                  {dataDetailEvent?.isOnline
                    ? ""
                    : ` - ${dataDetailEvent?.location?.address}`}
                </p>
              </div>
            </Skeleton>
          </div>
          <Skeleton
            className=" w-full aspect-video"
            isLoaded={!!dataDetailEvent?.banner}
          >
            <Image
              alt="cover"
              src={dataDetailEvent?.banner && dataDetailEvent?.banner}
              className="aspect-video w-full rounded-lg object-cover"
              width={1920}
              height={1080}
            />
          </Skeleton>
          <Tabs aria-label="Tab Detail Event" fullWidth>
            <Tab key="Description" title="Description">
              <h2 className="text-xl font-semibold text-foreground-700">
                About Event
              </h2>
              <Skeleton
                isLoaded={!!dataDetailEvent?.description}
                className="h-32 w-full rounded-lg mt-2"
              >
                <p className="text-foreground-500">
                  {dataDetailEvent?.description}
                </p>
              </Skeleton>
            </Tab>
            <Tab key="Ticket" title="Ticket">
              <h2 className="text-xl font-semibold text-foreground-700">
                Ticket
              </h2>
              <div className="mt-2 flex flex-col gap-8">
                {dataTicket?.map((item: ITicket) => (
                  <DetailEventTicket
                    key={`ticket-${item._id}`}
                    ticket={item}
                    cart={cart}
                    handleAddToCart={() => handleAddToCart(`${item._id}`)}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="w-full lg:w-2/6">
          <DetailEventCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
            onCreateOrder={mutateCreateOrder}
            isLoading={isPendingCreateOrder}
          />
        </div>
      </section>
    </div>
  );
}

export default DetailEvent;
