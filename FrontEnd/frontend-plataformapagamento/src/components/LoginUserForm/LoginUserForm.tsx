import { FaUser, FaKey } from 'react-icons/fa';
import { LoginContainer, Form } from './LoginUserForm.styles';

export function LoginUserForm() {
  return (
    <LoginContainer>
      <Form>
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

        <button type="submit">Entrar</button>
      </Form>
    </LoginContainer>
  );
}
