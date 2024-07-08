import { TransactionsTableContainer, Table } from "./TransactionsTable.styles";
import { FaArrowLeft, FaArrowRight, FaMoneyBill, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { AddButton } from "../AddButton/AddButton";
import { NewTransactionModal } from "../NewTransactionModal/NewTransactionModal";
import { useTransactions } from "../../hooks/useTransaction";
import { useUsers } from "../../hooks/useUsers";

export function TransactionsTable() {
  const {handleOpenNewTransactionModal, transactions, deleteTransaction} = useTransactions();
  const { users } = useUsers();

  const findUserNameById = (id: number) => {
    const user = users.find(user => user.id === id);
    return user ? `${formatName(user.firstName)} ${formatName(user.lastName)}` : 'Usuário não encontrado';
  };
  function formatName(userType:string) {
    // Capitaliza a primeira letra e deixa as demais minúsculas
    return userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase();
  }

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
            <th className="thsender">
              <FaArrowRight className="senderIcon"/> Sender
            </th>
            <th>
              <FaArrowLeft className="receiverIcon"/> Receiver
            </th>
            <th>
            <FaMoneyBill className="valueIcon"/> Value
            </th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
        {transactions.map((transaction) => (
          <tr key={`${transaction.idTransaction}`}>
              <td>{transaction.idTransaction}</td>
              <td>{findUserNameById(transaction.id_sender)}</td>
              <td>{findUserNameById(transaction.id_receiver)}</td>
              <td>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.value)}
              </td>
              <td onClick={()=>handleDeleteTransaction(transaction.idTransaction)}>
                <FaTrashAlt size={26} className="icon"/>
              </td>
            </tr>
          ))}
          
          
        </tbody>
      </Table>
    </TransactionsTableContainer>
  );
}
