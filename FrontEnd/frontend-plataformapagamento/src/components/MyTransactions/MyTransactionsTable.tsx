import React, { useEffect, useState, useRef } from "react";
import { TransactionsTableContainer, Table } from "../TransactionsTable/TransactionsTable.styles";
import { FaArrowLeft, FaArrowRight, FaMoneyBill, FaSync } from "react-icons/fa";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/axios";
import { toast } from "react-toastify";
import { RefreshButton } from "./MyTransactionsTable.styles";

// Variável estática para controlar se os dados já foram carregados na sessão atual
let dataLoaded = false;

interface Transaction {
  idTransaction: number;
  id_sender: number;
  id_receiver: number;
  value: number;
}

export function MyTransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { users } = useUsers();
  const { AuthenticatedUserInfo } = useAuth();
  const mountedRef = useRef(false);

  const findUserNameById = (id: number) => {
    const user = users.find((user) => user.id === id);
    return user ? `${user.firstName} ${user.lastName}` : "Usuário não encontrado";
  };

  const fetchMyTransactions = async (showToast = false) => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const response = await api.get("/transaction/myTransactions", {
        headers: {
          Authorization: `Bearer ${AuthenticatedUserInfo.token}`,
        },
      });
      setTransactions(response.data);
      
      if (showToast) {
        toast.success("Transações atualizadas com sucesso!");
      }
      
      dataLoaded = true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro ao carregar transações.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Evita que o efeito seja executado mais de uma vez
    if (!mountedRef.current) {
      mountedRef.current = true;
      
      // Só faz a requisição se os dados ainda não foram carregados
      if (!dataLoaded && AuthenticatedUserInfo.token) {
        fetchMyTransactions();
      }
    }

    // Limpa o flag quando o componente é desmontado
    return () => {
      mountedRef.current = false;
    };
  }, [AuthenticatedUserInfo.token]);

  const handleRefresh = () => {
    // Quando o usuário clica em atualizar, mostramos o toast
    fetchMyTransactions(true);
  };

  return (
    <TransactionsTableContainer>
      <RefreshButton onClick={handleRefresh} disabled={isLoading}>
        <FaSync className={isLoading ? "spinning" : ""} />
        {isLoading ? "Atualizando..." : "Atualizar Transações"}
      </RefreshButton>

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