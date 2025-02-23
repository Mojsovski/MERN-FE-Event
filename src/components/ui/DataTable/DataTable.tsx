import { LIMIT_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ReactNode, Key, useMemo, ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

interface IProps {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  currentPage: number;
  limit: string;
  totalPages: number;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  onClearSearch: () => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickButtonTopContent?: () => void;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  emptyContent: string;
  isLoading?: boolean;
}

const DataTable = (props: IProps) => {
  const {
    columns,
    data,
    renderCell,
    onClearSearch,
    onChangeSearch,
    buttonTopContentLabel,
    onClickButtonTopContent,
    limit,
    onChangeLimit,
    onChangePage,
    totalPages,
    currentPage,
    emptyContent,
    isLoading,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-y-4">
        <Input
          isClearable
          className="w-full sm:max-w-[24%]"
          placeholder="Search by name"
          startContent={<CiSearch />}
          onClear={onClearSearch}
          onChange={onChangeSearch}
        />
        {buttonTopContentLabel && (
          <Button color="danger" onPress={onClickButtonTopContent}>
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    onChangeSearch,
    onClearSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center  lg:justify-between">
        <Select
          disallowEmptySelection
          className="hidden max-w-36 lg:block"
          size="md"
          selectedKeys={[limit]}
          selectionMode="single"
          onChange={onChangeLimit}
          startContent={<p className="text-small">Show:</p>}
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
        {totalPages > 0 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={currentPage}
            total={totalPages}
            onChange={onChangePage}
            loop
          />
        )}
      </div>
    );
  }, [limit, currentPage, totalPages, onChangeLimit, onChangePage]);
  return (
    <Table
      topContent={TopContent}
      topContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner color="danger" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
