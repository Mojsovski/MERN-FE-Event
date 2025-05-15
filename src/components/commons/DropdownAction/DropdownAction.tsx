import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface IProps {
  onPressButtonDetail: () => void;
  onPressButtonDelete?: () => void;
  hideButtonDelete?: boolean;
}

const DropdownAction = (props: IProps) => {
  const {
    onPressButtonDetail,
    onPressButtonDelete,
    hideButtonDelete = false,
  } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail-event-item" onPress={onPressButtonDetail}>
          Detail
        </DropdownItem>
        {!hideButtonDelete ? (
          <DropdownItem
            key="delete-event"
            className="text-danger-500"
            onPress={onPressButtonDelete}
          >
            Delete
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
