import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/axios";
import { toast } from "react-toastify";

interface Users {
  id: number;
  firstName: string;
  lastName: string;
  document: string;
  email: string;
  password: string;
  balance: number;
  userType: string;
}
type UsersInput = Omit<Users, "id">;

interface UsersProviderProps {
  children: ReactNode;
}
interface UsersContextData {
  users: Users[];
  createUser: (usersInput: UsersInput) => Promise<boolean>;
  deleteUser:(id: number)=>void;
  loadUsers: () => Promise<void>;
  isLoadingUsers: boolean;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  async function loadUsers() {
    try {
      setIsLoadingUsers(true);
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message || "Erro ao carregar usuários.";
      
      if (!window.location.pathname.includes('/login')) {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoadingUsers(false);
    }
  }

  useEffect(() => {
    if (!window.location.pathname.includes('/login')) {
      loadUsers();
    }
  }, []);

  async function createUser(usersInput: UsersInput): Promise<boolean> {
    try {
      const response = await api.post("/users/register", {
        ...usersInput,
      });
      if (response.status === 201) {
        if (!window.location.pathname.includes('/login')) {
          setUsers([...users, response.data]);
        }
        toast.success("Usuário criado com Sucesso!");
        return true;
      }
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message || "Erro ao criar usuario.";
      toast.error(errorMessage);
      return false;
    }
    return false;
  }

  async function deleteUser(id: number){
    try {
        const response = await api.delete(`/users/delete/${id}`);
        if (response.status === 202) {
            setUsers((prevUser) =>
              prevUser.filter(
                (user) => user.id !== id
              )
            );
            toast.success(`Usuario ${id} deletado com Sucesso!`);
          }

    } catch (e: any) {
        const errorMessage =
          e.response?.data?.message || "Erro ao deletar usuario.";
        toast.error(errorMessage);
      }
  }

  return (
    <UsersContext.Provider value={{ users, createUser ,deleteUser, loadUsers, isLoadingUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  return context;
}
