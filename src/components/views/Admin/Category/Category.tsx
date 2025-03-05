import DataTable from "@/components/ui/DataTable/DataTable";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/router";
import { ReactNode, useCallback, Key, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constans";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/InputFile";
import AddCategoryModal from "./AddCategoryModal";

function Category() {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataCategory,
    isLoadingCategory,
    currentPage,
    currentLimit,
    isRefetchingCategory,
    handheChangePage,
    handheChangeLimit,
    handleSearch,
    handleClearSearch,
  } = useCategory();

  const addCategoryModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
        //   );

        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-item"
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key="delete-category"
                  className="text-danger-500"
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Delete Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          isLoading={isLoadingCategory || isRefetchingCategory}
          buttonTopContentLabel="Create Category"
          renderCell={renderCell}
          columns={COLUMN_LIST_CATEGORY}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addCategoryModal.onOpen}
          onChangeLimit={handheChangeLimit}
          onChangePage={handheChangePage}
          currentPage={Number(currentPage)}
          totalPages={dataCategory?.pagination.totalPages}
          limit={String(currentLimit)}
          emptyContent="Category is empty"
          data={dataCategory?.data || []}
        />
      )}
      <AddCategoryModal {...addCategoryModal} />
    </section>
  );
}

export default Category;
