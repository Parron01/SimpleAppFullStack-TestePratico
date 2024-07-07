import Modal from "react-modal";
import { NewTransactionModalContainer } from "./NewTransactionModal.styles";
import { useTransactions } from "../../hooks/useTransaction";
import { IoMdClose } from "react-icons/io";
import { FormEvent, useState } from "react";

export function NewTransactionModal() {
    const { isNewTransactionModalOpen, handleCloseNewTransactionModal , createTransaction} =
        useTransactions();

    const [idSender,setIdSender] = useState(0);
    const [idReceiver,setIdReceiver] = useState(0);
    const [value,setValue] = useState(0);

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();
        const id_sender = idSender;
        const id_receiver = idReceiver;
        await createTransaction({
            id_sender,
            id_receiver,
            value
        })

        setIdReceiver(0);
        setIdSender(0);
        setValue(0);
        handleCloseNewTransactionModal();
    }

    return (
        <Modal
            isOpen={isNewTransactionModalOpen}
            onRequestClose={handleCloseNewTransactionModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={handleCloseNewTransactionModal}
                className="react-modal-close"
            >
                <IoMdClose size={28}/>
            </button>
            <NewTransactionModalContainer onSubmit={handleCreateNewTransaction}>
                <h1>Do Your Transaction</h1>
                <input 
                type="text" 
                placeholder="Id Sender" 
                value={idSender}
                onChange={(event) => setIdSender(Number(event.target.value))}
                />
                <input type="text" 
                placeholder="Id Receiver" 
                value={idReceiver}
                onChange={(event) => setIdReceiver(Number(event.target.value))}
                />
                <input type="number" placeholder="Value" step={100}
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
                />
                <button type="submit" onClick={handleCreateNewTransaction}>
                    Send
                </button>
            </NewTransactionModalContainer>
        </Modal>
    );
}
