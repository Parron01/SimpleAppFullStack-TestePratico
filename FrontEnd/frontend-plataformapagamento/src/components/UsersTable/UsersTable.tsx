import { UsersTableContainer, Table } from "./UsersTable.styles";
import { FaTrashAlt, FaIdCard, FaEnvelope, FaMoneyBill, FaUser } from 'react-icons/fa';
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";

export function UsersTable() {
    const { users, deleteUser } = useUsers();
    const { AuthenticatedUserInfo } = useAuth();
    const loggedInUserId = parseInt(AuthenticatedUserInfo.AuthenticatedUserId);
 
  function handleDeleteUser(idUser: number) {
    deleteUser(idUser);
  }

  return (
    <UsersTableContainer>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th><FaUser /> Nome</th>
            <th><FaIdCard /> Documento</th>
            <th><FaEnvelope /> Email</th>
            <th><FaMoneyBill /> Saldo</th>
            <th>Tipo de Usuário</th>
            <th>Remover</th>
          </tr>
        </thead>

        <tbody>
        {users.map((user)=>( 
          <tr 
            key={`${user.id}`} 
            className={user.id === loggedInUserId ? "current-user" : ""}
          >
            <td>{user.id}</td>
            <td>{user.firstName + " " + user.lastName}</td>
            <td>{formatCPF(user.document)}</td>
            <td>{user.email}</td>
            <td>{new Intl.NumberFormat("pt-BR",{
              style:"currency",
              currency:"BRL",
            }).format(user.balance)}</td>
            <td>{formatName(user.userType)}</td>
            <td onClick={()=>handleDeleteUser(user.id)}>
                <FaTrashAlt size={24} className="icon"/>
            </td>
          </tr>
          ))}
        </tbody>
      </Table>
    </UsersTableContainer>
  );
}

function formatCPF(cpf:string) {
  // Formata o CPF na forma 112.331.551-23
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatName(userType:string) {
  // Capitaliza a primeira letra e deixa as demais minúsculas
  return userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase();
}