import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_TICKET } from "./Ticket.Tab.constans";
import useTicketTab from "./useTicketTab";

const TicketTab = () => {
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const { dataTicket, refetchdataTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;

        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                deleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    []
  );

  return (
    <Card className="w-full p-4 ">
      <CardHeader className="  flex justify-between items-center">
        <div className="flex flex-col ">
          <h1 className="text-xl font-bold">Event Ticket</h1>
          <p className="text-small text-default-400">
            Manage ticket of this event
          </p>
        </div>
        <Button color="danger">Add New Ticket</Button>
      </CardHeader>
      <CardBody className="pt-0">
        <DataTable
          columns={COLUMN_LIST_TICKET}
          data={dataTicket || []}
          emptyContent="Ticket is empty"
          isLoading={isPendingTicket || isRefetchingTicket}
          renderCell={renderCell}
          showLimit={false}
          showSearch={false}
          totalPages={1}
        />
      </CardBody>
    </Card>
  );
};

export default TicketTab;
