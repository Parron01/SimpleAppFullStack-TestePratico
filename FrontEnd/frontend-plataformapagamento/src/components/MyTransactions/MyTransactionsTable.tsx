import React, { useEffect, useState } from "react";
import { TransactionsTableContainer, Table } from "../TransactionsTable/TransactionsTable.styles";
import { FaArrowLeft, FaArrowRight, FaMoneyBill } from "react-icons/fa";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/axios";
import { toast } from "react-toastify";

interface Transaction {
  idTransaction: number;
  id_sender: number;
  id_receiver: number;
  value: number;
}

export function MyTransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { users } = useUsers();
  const { AuthenticatedUserInfo } = useAuth();

  const findUserNameById = (id: number) => {
    const user = users.find((user) => user.id === id);
    return user ? `${user.firstName} ${user.lastName}` : "Usuário não encontrado";
  };

  useEffect(() => {
    async function fetchMyTransactions() {
      try {
        const response = await api.get("/transaction/myTransactions", {
          headers: {
            Authorization: `Bearer ${AuthenticatedUserInfo.token}`,
          },
        });
        setTransactions(response.data);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Erro ao carregar transações.";
        toast.error(errorMessage);
      }
    }

    fetchMyTransactions();
  }, [AuthenticatedUserInfo.token]);

  if (!users || users.length === 0) {
    return <p>Carregando usuários...</p>;
  }

  return (
    <TransactionsTableContainer>
      <Table className="my-transactions-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>
              <FaArrowRight className="senderIcon" /> Remetente
            </th>
            <th>
              <FaArrowLeft className="receiverIcon" /> Destinatário
            </th>
            <th>
              <FaMoneyBill className="valueIcon" /> Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.idTransaction}>
              <td>{transaction.idTransaction}</td>
              <td>{findUserNameById(transaction.id_sender)}</td>
              <td>{findUserNameById(transaction.id_receiver)}</td>
              <td>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TransactionsTableContainer>
  );
}