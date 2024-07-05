import styled from "styled-components";


export const Button = styled.button`
    margin: 0 0 1rem auto;
    padding: 1rem 3rem;
    background: ${props=>props.theme["green-500"]};
    color: ${props=>props.theme["gray-100"]};
    border-radius: 0.4rem;
    border: 1px solid ${props=>props.theme["green-700"]};

    display: flex;
    align-items: right;
    gap: 0.5rem;

    font-size: 1.1rem;

    transition: background 0.3s;
    &:hover{
        color: ${props=>props.theme["white"]};
        background: ${props=>props.theme["green-300"]};
    }

`;