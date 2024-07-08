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
    background: ${props=>props.theme["gray-700"]};
    color: ${props=>props.theme["gray-300"]};
    border-radius: 0.75rem;
    box-shadow: 1px 1px;
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
`
    
