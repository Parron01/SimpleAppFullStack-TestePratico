import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const RefreshButton = styled.button`
  margin: 0 0 1rem auto;
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme["blue-700"]};
  color: ${props => props.theme["gray-100"]};
  border-radius: 0.4rem;
  border: 1px solid ${props => props.theme["blue-500"]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s;
  
  &:hover {
    background: ${props => props.theme["blue-500"]};
    color: ${props => props.theme.white};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .spinning {
    animation: ${spin} 1s infinite linear;
  }
`;
