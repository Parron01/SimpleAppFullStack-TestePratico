import styled from "styled-components";

export const WelcomeContainer = styled.div`
  max-width: 88rem;
  margin: 2rem auto 0;
  padding: 1rem;
  background-color: ${props => props.theme["gray-800"]};
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme["gray-700"]};
  
  h2 {
    color: ${props => props.theme["gray-100"]};
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }
`;

export const UserId = styled.span`
  color: ${props => props.theme["blue-700"]};
  font-weight: 600;
`;
