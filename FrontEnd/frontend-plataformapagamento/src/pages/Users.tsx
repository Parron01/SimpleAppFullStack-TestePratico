import { UsersTable } from "../components/UsersTable/UsersTable";
import { UsersProvider } from "../hooks/useUsers";

export function Users() {
  return (
    <UsersProvider>
      <UsersTable/>
    </UsersProvider>
  );
}
