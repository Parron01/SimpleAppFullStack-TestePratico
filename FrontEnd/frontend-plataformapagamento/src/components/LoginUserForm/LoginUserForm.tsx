import { FaUser, FaKey } from 'react-icons/fa';
import { LoginContainer, Form, ReturnButton, LoginButton } from './LoginUserForm.styles';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';


export function LoginUserForm() {
  const navigate = useNavigate();
  
  function handleReturnButton(){
    navigate("/");
  }

  return (
    <LoginContainer>
      <Form>
      <ReturnButton onClick={handleReturnButton}>
          <IoReturnUpBackOutline size={38} />
        </ReturnButton>
        <h1>Login</h1>

        <div>
          <label htmlFor="username">
            <FaUser />
            <span>Usuário</span>
          </label>
          <input id="username" type="text" placeholder="Digite seu usuário" />
        </div>

        <div>
          <label htmlFor="password">
            <FaKey />
            <span>Senha</span>
          </label>
          <input id="password" type="password" placeholder="Digite sua senha" />
        </div>

        <LoginButton type="submit">Entrar</LoginButton>
      </Form>
    </LoginContainer>
  );
}
