import { RegisterUserForm } from "../components/RegisterUserForm/RegisterUserForm";
import { UsersProvider } from "../hooks/useUsers";

export function Register() {
    return (
      <UsersProvider>
        <RegisterUserForm/> 
      </UsersProvider>
    );
  }
  