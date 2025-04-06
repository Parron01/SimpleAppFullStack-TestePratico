import styled from "styled-components";

export const NewTransactionModalContainer = styled.form`
h1{
    margin-bottom: 1rem;
}
input, select { // Adicionando select junto ao input
    display: flex;
    width: 100%;
    margin: 1rem 0;
    padding: 1rem;
    background: ${props=>props.theme["gray-700"]};
    color: ${props=>props.theme["gray-300"]};
    border-radius: 0.75rem;
    box-shadow: 1px 1px;
    border: none;

    // Para o select, remover a aparência padrão
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    // Adicionar um ícone de seta para o select
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1rem;
}
label{
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
`;

export const SendButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    background-color: ${props => props.theme['blue-700']};
    color: ${props => props.theme['gray-100']};
    border: none;
    border-radius: 5px;
    font-size: 1.3rem;
    margin-top: 1.5rem;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
    &:hover {
        background-color: ${props => props.theme['blue-500']};
        color: ${props => props.theme['white']};
    }
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme["red-500"]};
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;
export const DisabledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme["gray-600"]};
  color: ${props => props.theme["gray-400"]};
  border: none;
  border-radius: 5px;
  font-size: 1.3rem;
  margin-top: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  cursor: not-allowed;
`;