import DataTable from "@/components/ui/DataTable/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { ReactNode, useCallback, Key, useEffect } from "react";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constans";
import useTransaction from "./useTransaction";

import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { convertIDR } from "@/utils/currency";
import DeleteTransactionModal from "./DeleteTransactionModal";

function Transaction() {
  const { push, query, isReady } = useRouter();
  const { setUrl } = useChangeUrl();

  const deleteTransactionModal = useDisclosure();

  const {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,

    selectedId,
    setSelectedId,
  } = useTransaction();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              color={
                cellValue === "completed"
                  ? "success"
                  : cellValue === "pending"
                    ? "warning"
                    : "danger"
              }
              size="sm"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip>
          );

        case "total":
          return convertIDR(Number(cellValue));

        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/transaction/${transaction?.orderId}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${transaction.orderId}`);
                deleteTransactionModal.onOpen();
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
          columns={COLUMN_LIST_TRANSACTION}
          data={dataTransactions?.data || []}
          emptyContent="Transaction is empty"
          isLoading={isLoadingTransactions || isRefetchingTransactions}
          renderCell={renderCell}
          totalPages={dataTransactions?.pagination.totalPages}
        />
      )}
      <DeleteTransactionModal
        refetchTransaction={refetchTransactions}
        {...deleteTransactionModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
}

export default Transaction;
