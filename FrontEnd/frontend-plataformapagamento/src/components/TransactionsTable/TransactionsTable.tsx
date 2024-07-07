import { TransactionsTableContainer, Table } from "./TransactionsTable.styles";
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { AddButton } from "../AddButton/AddButton";
import { NewTransactionModal } from "../NewTransactionModal/NewTransactionModal";
import { useTransactions } from "../../hooks/useTransaction";

export function TransactionsTable() {
  const {handleOpenNewTransactionModal, transactions, deleteTransaction} = useTransactions();

   function handleDeleteTransaction(idTransaction:number){
    deleteTransaction(idTransaction);
  }

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
            <th>Value</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
        {transactions.map((transaction) => (
            <tr key={`${transaction.idTransaction}`}>
              <td>{transaction.idTransaction}</td>
              <td>{transaction.id_sender}</td>
              <td>{transaction.id_receiver}</td>
              <td>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.value)}
              </td>
              <td onClick={()=>handleDeleteTransaction(transaction.idTransaction)}>
                <FaTrashAlt/>
              </td>
            </tr>
          ))}
          
          
        </tbody>
      </Table>
    </TransactionsTableContainer>
  );
}
