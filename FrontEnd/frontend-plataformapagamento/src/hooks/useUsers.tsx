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
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);




export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e: any) => {
        const errorMessage =
          e.response?.data?.message || "Erro ao carregar transações.";
        toast.error(errorMessage);
      });
  }, []);

  async function createUser(usersInput: UsersInput): Promise<boolean> {
    try {
      const response = await api.post("/users/register", {
        ...usersInput,
      });
      if (response.status === 201) {
        setUsers([...users, response.data]);
        toast.success("Usuário criado com Sucesso!");
        return true;
      }
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message || "Erro ao criar usuario.";
      toast.error(errorMessage);
      return false;
    }
    return false; // Fallback para caso nenhuma condição anterior seja atendida
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
    <UsersContext.Provider value={{ users, createUser ,deleteUser}}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  return context;
}
