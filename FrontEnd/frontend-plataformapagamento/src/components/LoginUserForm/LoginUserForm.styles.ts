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
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: ${props => props.theme['gray-300']};
  }

  div {
    margin-bottom: 1rem;

    label {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      color: #333;

      span {
        margin-left: 0.5rem;
      }
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
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fdecea;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const RegisterLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme['blue-500']};
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  width: 100%;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
    color: ${props => props.theme['blue-700']};
  }
`;

export const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
  
  input {
    width: 100%;
    padding-right: 40px; /* Space for the eye icon */
  }
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme['gray-500']};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme['gray-300']};
  }
`;