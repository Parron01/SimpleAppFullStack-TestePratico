import { createContext, ReactNode, useContext, useState } from "react";

interface TransactionsModalProviderProps {
    children: ReactNode;
}

interface TransactionsModalContextData {
    handleOpenNewTransactionModal: ()=>void;
    handleCloseNewTransactionModal: ()=>void;
    isNewTransactionModalOpen:boolean;
}

const TransactionsModalContext = createContext<TransactionsModalContextData>
({} as TransactionsModalContextData);

export function TransactionsModalProvider({children}:TransactionsModalProviderProps){
    const [isNewTransactionModalOpen,setisNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal(){
        setisNewTransactionModalOpen(true);
    }
    function handleCloseNewTransactionModal(){
        setisNewTransactionModalOpen(false);
    }
    return(
        <TransactionsModalContext.Provider value={{handleOpenNewTransactionModal,handleCloseNewTransactionModal, isNewTransactionModalOpen}}>
        {children}
        </TransactionsModalContext.Provider>
    );
}

export function useTransactionsModal(){
    const context = useContext(TransactionsModalContext);

    return context;
}