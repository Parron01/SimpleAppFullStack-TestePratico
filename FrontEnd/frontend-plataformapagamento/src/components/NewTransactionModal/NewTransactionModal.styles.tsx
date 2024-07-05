import styled from "styled-components";

export const NewTransactionModalContainer = styled.form`
h1{
    margin-bottom: 1rem;
}
input{
    display: flex;
    width: 100%;
    margin: 1rem 0;
    padding: 1rem;
    background-color: ${props=>props.theme["gray-700"]};
    color: ${props=>props.theme["gray-300"]};
    border: 1px solid ${props=>props.theme["gray-700"]};
    border-radius: 0.75rem;
    box-shadow: 1px 1px;
}

button {
    width: 100%;
    padding: 0.75rem;
    background-color: ${props => props.theme['blue-700']};
    color: ${props => props.theme['gray-100']};
    border: none;
    border-radius: 5px;
    font-size: 1.3rem;
    margin-top: 1rem;
    
    &:hover {
        background-color: ${props => props.theme['blue-500']};
        color: ${props => props.theme['white']};
    }
  }
`;