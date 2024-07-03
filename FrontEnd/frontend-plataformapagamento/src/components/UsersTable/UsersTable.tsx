import { UsersTableContainer } from "./UsersTable.styles";
import { FaPlus, FaEdit  } from 'react-icons/fa';

export function UsersTable() {
  return (
    <UsersTableContainer>
      <button>
        <FaPlus/>Criar Usuário
      </button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Document</th>
            <th>Email</th>
            <th>Balance</th>
            <th>UserType</th>
            <th>Edit</th>
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
              <a href="/">
                <FaEdit size={24}/>
              </a>
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
              <a href="/">
                <FaEdit size={24}/>
              </a>
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
              <a href="/">
                <FaEdit size={24}/>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </UsersTableContainer>
  );
}
