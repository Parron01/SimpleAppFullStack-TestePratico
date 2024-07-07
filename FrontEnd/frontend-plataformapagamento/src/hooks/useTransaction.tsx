import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Transaction {
    idTransaction:number;
    id_sender: number;
    id_receiver: number;
    value: number;
}

type TransactionInput = Omit<Transaction,"idTransaction">;


interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    handleOpenNewTransactionModal: ()=>void;
    handleCloseNewTransactionModal: ()=>void;
    isNewTransactionModalOpen:boolean;
    transactions: Transaction[];
    createTransaction:(TransactionInput:TransactionInput)=> void;
    deleteTransaction:(id:number)=> Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>
({} as TransactionsContextData);




export function TransactionsProvider({children}:TransactionsProviderProps){
    const [isNewTransactionModalOpen,setisNewTransactionModalOpen] = useState(false);
    const[transactions, setTransactions] = useState<Transaction[]>([]);

    //MANIPULAÇÃO DE DADOS
    useEffect(() => {
        api.get("/transaction")

            .then((response) => {
            setTransactions(response.data)})

            .catch((e:any)=>{
            const errorMessage = e.response?.data?.message || 'Erro ao carregar transações.';
            toast.error(errorMessage);})
      }, []);


      async function createTransaction(transactionInput: TransactionInput){
        try{
            const response = await api.post("/transaction/create",{
            ...transactionInput
        });
        if(response.status === 201){
            setTransactions([...transactions,response.data]);
            toast.success("Transação criada com Sucesso!")
        }}catch(e:any){
            const errorMessage = e.response?.data?.message || 'Erro ao deletar transação.'
            toast.error(errorMessage)
        }
        
    }
    async function deleteTransaction(id?: number) {
        try {
            const response = await api.delete(`/transaction/delete/${id}`);
            
            if (response.status === 202) {
                setTransactions((prevTransactions) =>
                    prevTransactions.filter(transaction => transaction.idTransaction !== id));
                toast.success(`Transação ${id} deletada com Sucesso!`)
        }
    } catch(e:any){
        const errorMessage = e.response?.data?.message || 'Erro ao deletar transação.'
        toast.error(errorMessage)
    }
}


    //MODAL
    function handleOpenNewTransactionModal(){
        setisNewTransactionModalOpen(true);
    }
    function handleCloseNewTransactionModal(){
        setisNewTransactionModalOpen(false);
    }


    return(
        <TransactionsContext.Provider value={{handleOpenNewTransactionModal,handleCloseNewTransactionModal, isNewTransactionModalOpen, transactions, createTransaction, deleteTransaction}}>
        {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}