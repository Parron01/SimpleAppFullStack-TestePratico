import Modal from "react-modal";
import { NewTransactionModalContainer, SendButton, DisabledButton, ErrorMessage } from "./NewTransactionModal.styles";
import { useTransactions } from "../../hooks/useTransaction";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { FormEvent, useState, useEffect } from "react";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    handleCloseNewTransactionModal,
    createTransaction,
  } = useTransactions();

  const { users } = useUsers();
  const { AuthenticatedUserInfo } = useAuth();

  const [idSender, setIdSender] = useState("");
  const [idReceiver, setIdReceiver] = useState("");
  const [value, setValue] = useState("");
  const [userType, setUserType] = useState("");

  // Preencher automaticamente o campo Sender com o usuário logado
  useEffect(() => {
    const loggedUser = users.find(
      (user) => user.id.toString() === AuthenticatedUserInfo.AuthenticatedUserId
    );
    if (loggedUser) {
      setIdSender(loggedUser.id.toString());
      setUserType(loggedUser.userType);
    }
  }, [AuthenticatedUserInfo, users]);

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    // Impedir envio se o usuário for do tipo "LOJISTA"
    if (userType === "LOJISTA") {
      return;
    }

    await createTransaction({
      id_sender: parseFloat(idSender),
      id_receiver: parseFloat(idReceiver),
      value: parseFloat(value),
    });

    setIdReceiver("");
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
        <h1>Realizar Transação</h1>
        <div className="form-group">
          <label htmlFor="idSender">Remetente</label>
          <select id="idSender" value={idSender} disabled>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="idReceiver">Destinatário</label>
          <select
            id="idReceiver"
            value={idReceiver}
            onChange={(event) => setIdReceiver(event.target.value)}
          >
            <option value="">Selecione o Destinatário</option>
            {users
              .filter((user) => user.id.toString() !== idSender) // Excluir o usuário logado
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="value">Valor</label>
          <input
            id="value"
            type="number"
            placeholder="Digite o valor"
            step={1}
            min={0}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        {userType === "LOJISTA" ? (
          <>
            <ErrorMessage>
              Usuário de tipo Lojista não pode fazer transação, só receber.
            </ErrorMessage>
            <DisabledButton>
              <FaArrowLeft />
              Enviar
            </DisabledButton>
          </>
        ) : (
          <SendButton type="submit">
            <FaArrowLeft />
            Enviar
          </SendButton>
        )}
      </NewTransactionModalContainer>
    </Modal>
  );
}