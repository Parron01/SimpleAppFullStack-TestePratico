import { NavLink } from "react-router-dom";
import { UsersTableContainer,Table } from "./UsersTable.styles";
import { FaPlus, FaEdit, FaTrashAlt, FaIdCard, FaEnvelope, FaMoneyBill, FaUser } from 'react-icons/fa';
import { AddButton } from "../AddButton/AddButton";
import { useUsers } from "../../hooks/useUsers";

export function UsersTable() {
    const {users,deleteUser} = useUsers();
 
  function handleDeleteUser(idUser:number){
    deleteUser(idUser);
  }

  return (
    <UsersTableContainer>

      <NavLink to="/register">
        <AddButton>
          <FaPlus />Register User
        </AddButton>
      </NavLink>


      <Table>
        <thead>
          <tr>
          <th>Id</th>
            <th><FaUser /> Name</th>
            <th><FaIdCard /> Document</th>
            <th><FaEnvelope /> Email</th>
            <th><FaMoneyBill /> Balance</th>
            <th>UserType</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
        {users.map((user)=>(
          <tr key={`${user.id}`}>
            <td>{user.id}</td>
            <td>{formatName(user.firstName) + " " + formatName(user.lastName)}</td>
            <td>{formatCPF(user.document)}</td>
            <td>{user.email}</td>
            <td>{new Intl.NumberFormat("pt-BR",{
              style:"currency",
              currency:"BRL",
            }).format(user.balance)}</td>
            <td>{formatName(user.userType)}</td>
            <td>
                <FaEdit size={24} className="icon" />
            </td>
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