import { UsersTable } from "../components/UsersTable/UsersTable";
import { UsersProvider } from "../hooks/useUsers";
import { UserWelcome } from "../components/UserWelcome/UserWelcome";

export function Users() {
  return (
    <UsersProvider>
      <UserWelcome />
      <UsersTable/>
    </UsersProvider>
  );
}
