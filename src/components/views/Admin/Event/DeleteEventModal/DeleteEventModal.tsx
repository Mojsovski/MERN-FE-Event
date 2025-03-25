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
import useDeleteEventModal from "./useDeleteEventModal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  refetchEvents: () => void;
  onOpenChange: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteEventModal = (props: IProps) => {
  const {
    isOpen,
    onClose,
    refetchEvents,
    onOpenChange,
    selectedId,
    setSelectedId,
  } = props;
  const {
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
  } = useDeleteEventModal();

  useEffect(() => {
    if (isSuccessMutateDeleteEvent) {
      onClose();
      refetchEvents();
    }
  }, [isSuccessMutateDeleteEvent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Event</ModalHeader>
        <ModalBody>
          <p className="text-medium ">
            Are ypu sure you want to delete this event?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteEvent}
          >
            Cancel
          </Button>
          <Button
            onPress={() => mutateDeleteEvent(selectedId)}
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteEvent}
          >
            {isPendingMutateDeleteEvent ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Event"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
