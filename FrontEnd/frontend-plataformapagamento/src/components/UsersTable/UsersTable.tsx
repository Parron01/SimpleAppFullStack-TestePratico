import { NavLink } from "react-router-dom";
import { UsersTableContainer,Table } from "./UsersTable.styles";
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AddButton } from "../AddButton/AddButton";

export function UsersTable() {
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
            <th>Name</th>
            <th>Document</th>
            <th>Email</th>
            <th>Balance</th>
            <th>UserType</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Jose Fernando</td>
            <td>123.939.949-01</td>
            <td>email@email.com</td>
            <td>R$1500.00</td>
            <td>Lojista</td>
            <td>
              <NavLink
                to="/"
                title="Update"
              >
                <FaEdit size={24} />
              </NavLink>
            </td>
            <td>
              <NavLink
                to="/"
                title="Delete"
              >
                <FaTrashAlt size={24} />
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Jose Fernando</td>
            <td>123.939.949-01</td>
            <td>email@email.com</td>
            <td>R$1500.00</td>
            <td>Lojista</td>
            <td>
              <NavLink
                to="/"
                title="Update"
              >
                <FaEdit size={24} />
              </NavLink>
            </td>
            <td>
              <NavLink
                to="/"
                title="Delete"
              >
                <FaTrashAlt size={24} />
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Jose Fernando</td>
            <td>123.939.949-01</td>
            <td>email@email.com</td>
            <td>R$1500.00</td>
            <td>Lojista</td>
            <td>
              <NavLink
                to="/"
                title="Update"
              >
                <FaEdit size={24} />
              </NavLink>
            </td>
            <td>
              <NavLink
                to="/"
                title="Delete"
              >
                <FaTrashAlt size={24} />
              </NavLink>
            </td>
          </tr>
        </tbody>
      </Table>
    </UsersTableContainer>
  );
}
