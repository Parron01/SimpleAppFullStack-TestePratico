import { useState } from "react";
import { LoginUserForm } from "../components/LoginUserForm/LoginUserForm";
import { RegisterUserForm } from "../components/RegisterUserForm/RegisterUserForm";
import { UsersProvider } from "../hooks/useUsers";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${props => props.theme["gray-900"]};
`;

export function Login() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <UsersProvider>
      <LoginContainer>
        {showLoginForm ? (
          <LoginUserForm onSwitchToRegister={() => setShowLoginForm(false)} />
        ) : (
          <RegisterUserForm onSwitchToLogin={() => setShowLoginForm(true)} />
        )}
      </LoginContainer>
    </UsersProvider>
  );
}
