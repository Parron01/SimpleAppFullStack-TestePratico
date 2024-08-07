import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme['gray-900']};
`;

export const Form = styled.form`
  background-color: ${props => props.theme['gray-800']};
  padding: 2rem 4rem;
  border-radius: 10px;
  width: 100%;
  max-width: 28rem;
  position: relative;

  h1 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: ${props => props.theme['gray-300']};
  }

  div {
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 5px;
    font-size: 1rem;
    background-color: ${props => props.theme['gray-700']};
    color: ${props => props.theme['gray-300']};
    border: 1px solid ${props=>props.theme['gray-600']};
    &:focus{
      background-color: ${props => props.theme['gray-700']};
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.theme['gray-300']};
    margin-bottom: 1rem;

    svg {
      font-size: 1.2rem;
    }
  }

  `;

export const LoginButton = styled.button`
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

`

export const ReturnButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.35rem;
    border: 0;
    border-radius: 0.5rem;
    background: ${props=>props.theme['gray-600']};
    color:${props=>props.theme['gray-100']} ;

    transition: filter 0.2s;
    &:hover{
        filter: brightness(0.7);
    }
`;