import Modal from "react-modal";
import { NewTransactionModalContainer, SendButton } from "./NewTransactionModal.styles";
import { useTransactions } from "../../hooks/useTransaction";
import { IoMdClose } from "react-icons/io";
import { FaUser, FaArrowLeft, FaMoneyBill } from "react-icons/fa"; 
import { FormEvent, useState } from "react";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    handleCloseNewTransactionModal,
    createTransaction,
  } = useTransactions();

  const [idSender, setIdSender] = useState("");
  const [idReceiver, setIdReceiver] = useState("");
  const [value, setValue] = useState("");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      id_sender: parseFloat(idSender),
      id_receiver: parseFloat(idReceiver),
      value: parseFloat(value),
    });

    setIdReceiver("");
    setIdSender("");
    setValue("");
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
        <IoMdClose size={28} />
      </button>
      <NewTransactionModalContainer onSubmit={handleCreateNewTransaction}>
        <h1>Do Your Transaction</h1>
        <div className="form-group">
          <label htmlFor="idSender">
            <FaUser size={20} />
            Id Sender
          </label>
          <input
            id="idSender"
            type="text"
            placeholder="Id Sender"
            value={idSender}
            onChange={(event) => setIdSender(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idReceiver">
            <FaUser size={20}/>
            Id Receiver
          </label>
          <input
            id="idReceiver"
            type="text"
            placeholder="Id Receiver"
            value={idReceiver}
            onChange={(event) => setIdReceiver(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">
            <FaMoneyBill size={20}/>
            Value
          </label>
          <input
            id="value"
            type="number"
            placeholder="Value"
            step={100}
            min={0}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <SendButton type="submit" onClick={handleCreateNewTransaction}>
          <FaArrowLeft />
          Send
        </SendButton>
      </NewTransactionModalContainer>
    </Modal>
  );
}
