import Modal from "react-modal";
import { NewTransactionModalContainer } from "./NewTransactionModal.styles";
import { useTransactionsModal } from "../../hooks/useTransactionModal";
import { IoMdClose } from "react-icons/io";

export function NewTransactionModal() {
    const { isNewTransactionModalOpen, handleCloseNewTransactionModal } =
        useTransactionsModal();

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
            <NewTransactionModalContainer>
                <h1>Do Your Transaction</h1>
                <input type="text" placeholder="Id Sender" />
                <input type="text" placeholder="Id Receiver" />
                <input type="number" placeholder="Amount" step={100}/>
                <button type="submit" onClick={handleCloseNewTransactionModal}>
                    Send
                </button>
            </NewTransactionModalContainer>
        </Modal>
    );
}
