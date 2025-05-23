import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTicketModal from "./useDeleteTicketModal";
import { ITicket } from "@/types/Ticket";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  refetchTicket: () => void;
  onOpenChange: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const DeleteTicketModal = (props: IProps) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTicket,
    selectedDataTicket,
    setSelectedDataTicket,
  } = props;

  const {
    mutateDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessMutateDeleteTicket,
  } = useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTicket) {
      onClose();
      refetchTicket();
      setSelectedDataTicket(null);
    }
  }, [isSuccessMutateDeleteTicket]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Ticket</ModalHeader>
        <ModalBody>
          <p className="text-medium ">
            Are ypu sure you want to delete this ticket?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedDataTicket(null);
            }}
            disabled={isPendingMutateDeleteTicket}
          >
            Cancel
          </Button>
          <Button
            onPress={() => mutateDeleteTicket(`${selectedDataTicket?._id}`)}
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTicket}
          >
            {isPendingMutateDeleteTicket ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Ticket"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTicketModal;
