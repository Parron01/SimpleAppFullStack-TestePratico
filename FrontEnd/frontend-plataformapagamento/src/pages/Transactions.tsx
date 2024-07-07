import { TransactionsTable } from "../components/TransactionsTable/TransactionsTable";
import { TransactionsProvider } from "../hooks/useTransaction";

export function Transactions() {
  return (
    <TransactionsProvider>
      <TransactionsTable />
    </TransactionsProvider>
  );
}
