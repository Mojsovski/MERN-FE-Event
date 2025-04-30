import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Pagination, Select, SelectItem } from "@heroui/react";

interface IProps {
  totalPages: number;
}

const EventFooter = (props: IProps) => {
  const { totalPages } = props;
  const { currentLimit, handleChangeLimit, currentPage, handleChangePage } =
    useChangeUrl();

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-center  lg:justify-between">
      <Select
        disallowEmptySelection
        className=" max-w-28 "
        size="md"
        selectedKeys={[`${currentLimit}`]}
        selectionMode="single"
        onChange={handleChangeLimit}
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
          page={Number(currentPage)}
          total={totalPages}
          onChange={handleChangePage}
          loop
        />
      )}
    </div>
  );
};
export default EventFooter;
