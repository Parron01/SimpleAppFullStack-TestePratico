import { NavLink } from "react-router-dom";

import { TransactionsTableContainer, Table } from "./TransactionsTable.styles";
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { AddButton } from "../AddButton/AddButton";
import { NewTransactionModal } from "../NewTransactionModal/NewTransactionModal";
import { useTransactionsModal } from "../../hooks/useTransactionModal";

export function TransactionsTable() {
  const {handleOpenNewTransactionModal} = useTransactionsModal();

  return (
    <TransactionsTableContainer>

        <AddButton onClick={handleOpenNewTransactionModal}>
          <FaPlus/>New Transaction
        </AddButton>

        <NewTransactionModal
        />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>João Carlos</td>
            <td>Jose Aparecido</td>
            <td>R$1500.00</td>
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
    </TransactionsTableContainer>
  );
}
