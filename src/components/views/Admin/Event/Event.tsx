import DataTable from "@/components/ui/DataTable/DataTable";
import { useDisclosure, Chip } from "@heroui/react";
import { useRouter } from "next/router";
import { ReactNode, useCallback, Key, useEffect } from "react";
import { COLUMN_LIST_EVENT } from "./Event.constans";
import useEvent from "./useEvent";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";

function Event() {
  const { push, query, isReady } = useRouter();
  const { setUrl } = useChangeUrl();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,

    selectedId,
    setSelectedId,
  } = useEvent();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="w-36 aspect-video object-cover rounded-lg"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );

        case "isPublish":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );

        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push]
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Event"
          columns={COLUMN_LIST_EVENT}
          data={dataEvents?.data || []}
          emptyContent="Event is empty"
          isLoading={isLoadingEvents || isRefetchingEvents}
          onClickButtonTopContent={addEventModal.onOpen}
          renderCell={renderCell}
          totalPages={dataEvents?.pagination.totalPages}
        />
      )}
      <AddEventModal refetchEvents={refetchEvents} {...addEventModal} />
      <DeleteEventModal
        refetchEvents={refetchEvents}
        {...deleteEventModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
}

export default Event;
