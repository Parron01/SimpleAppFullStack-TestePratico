import { TransactionsTable } from "../components/TransactionsTable/TransactionsTable";
import { TransactionsProvider } from "../hooks/useTransaction";
import { UsersProvider } from "../hooks/useUsers";

export function Transactions() {
  return (
    <TransactionsProvider>
      <UsersProvider>
        <TransactionsTable />
      </UsersProvider>
    </TransactionsProvider>
  );
}
