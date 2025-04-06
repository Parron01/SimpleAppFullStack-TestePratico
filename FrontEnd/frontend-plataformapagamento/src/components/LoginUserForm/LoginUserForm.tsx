import { FaUser, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import { LoginContainer, Form, LoginButton, ErrorMessage, RegisterLink, PasswordInputContainer, TogglePasswordButton } from './LoginUserForm.styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';

interface LoginUserFormProps {
  onSwitchToRegister: () => void;
}

export function LoginUserForm({ onSwitchToRegister }: LoginUserFormProps) {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth();
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLoginSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    
    if (!document || !password) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      await signIn({ document, password });
      navigate("/"); // Redireciona para a página principal após login
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setError("Documento ou senha incorretos");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
      console.error("Erro de login:", error);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleLoginSubmit}>
        <h1>Login</h1>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div>
          <label htmlFor="document">
            <FaUser />
            <span>Documento</span>
          </label>
          <input 
            id="document" 
            type="text" 
            placeholder="Digite seu documento" 
            value={document}
            onChange={(event) => setDocument(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">
            <FaKey />
            <span>Senha</span>
          </label>
          <PasswordInputContainer>
            <input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Digite sua senha" 
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TogglePasswordButton 
              type="button" 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePasswordButton>
          </PasswordInputContainer>
        </div>

        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </LoginButton>
        
        <RegisterLink type="button" onClick={onSwitchToRegister}>
          Não tem uma conta? Registre-se aqui
        </RegisterLink>
      </Form>
    </LoginContainer>
  );
}