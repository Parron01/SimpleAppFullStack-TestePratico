import Modal from "react-modal";
import { NewTransactionModalContainer } from "./NewTransactionModal.styles";

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose:()=>void;
}

export function NewTransactionModal({isOpen,onRequestClose}:NewTransactionModalProps){
    return(
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <NewTransactionModalContainer>
            <h1>Do Your Transaction</h1>
            <input type="text" placeholder="Id Sender" />
            <input type="text" placeholder="Id Receiver" />
            <input type="number" placeholder="Amount"/>
            <button 
            type="submit"
            onClick={onRequestClose}
            >Send</button>

        </NewTransactionModalContainer>
        </Modal>
    );
}