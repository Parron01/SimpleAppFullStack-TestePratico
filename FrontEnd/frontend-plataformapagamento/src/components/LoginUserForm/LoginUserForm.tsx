import { FaUser, FaKey } from 'react-icons/fa';
import { LoginContainer, Form, ReturnButton, LoginButton } from './LoginUserForm.styles';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';


export function LoginUserForm() {
  const navigate = useNavigate();
  const {signIn} = useAuth();
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");


  
  function handleReturnButton(){
    navigate("/");
  }

  function handleLoginSubmit(event: FormEvent){
    event.preventDefault();
    signIn({document,password});
  }

  return (
    <LoginContainer>
      <Form onSubmit={handleLoginSubmit}>
      <ReturnButton onClick={handleReturnButton}>
          <IoReturnUpBackOutline size={38} />
        </ReturnButton>
        <h1>Login</h1>

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
          onChange={(event)=>setDocument(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">
            <FaKey />
            <span>Senha</span>
          </label>
          <input 
          id="password" 
          type="password" 
          placeholder="Digite sua senha" 
          value={password}
          onChange={(event)=>setPassword(event.target.value)}
          />
        </div>

        <LoginButton type="submit">Entrar</LoginButton>
      </Form>
    </LoginContainer>
  );
}
