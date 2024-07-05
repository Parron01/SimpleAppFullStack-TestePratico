import { TransactionsTable } from "../components/TransactionsTable/TransactionsTable";
import { TransactionsModalProvider } from "../hooks/useTransactionModal";

export function Transactions() {
  return (
    <TransactionsModalProvider>
      <TransactionsTable />
    </TransactionsModalProvider>
  );
}
