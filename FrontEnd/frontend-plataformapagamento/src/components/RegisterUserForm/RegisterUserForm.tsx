import {
  FaUser,
  FaEnvelope,
  FaKey,
  FaMoneyBill,
  FaIdCard,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import {
  RegisterContainer,
  Form,
  ReturnButton,
  RegisterButton,
  LoginLink,
  PasswordInputContainer,
  TogglePasswordButton
} from "./RegisterUserForm.styles";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";

interface RegisterUserFormProps {
  onSwitchToLogin?: () => void;
}

export function RegisterUserForm({ onSwitchToLogin }: RegisterUserFormProps) {
  const { createUser } = useUsers();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [userType, setUserType] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkFormValidity = () => {
      setIsFormValid(
        firstName !== "" &&
          lastName !== "" &&
          document !== "" &&
          email !== "" &&
          password !== "" &&
          balance !== "" &&
          userType !== ""
      );
    };

    checkFormValidity();
  }, [firstName, lastName, document, email, password, balance, userType]);

  async function handleCreateNewUser(event: FormEvent) {
    event.preventDefault();
    if (createUser) {
      const isSuccess = await createUser({
        firstName,
        lastName,
        document,
        email,
        password,
        balance: parseFloat(balance),
        userType,
      });
      if (isSuccess) {
        // Limpar os dados
        setFirstName("");
        setLastName("");
        setDocument("");
        setEmail("");
        setPassword("");
        setBalance("");
        setUserType("");

        // Se for chamado da página de login, voltar para o formulário de login
        if (onSwitchToLogin) {
          onSwitchToLogin();
        } else {
          // Redirecionar para a página inicial
          navigate("/");
        }
      }
    }
  }
  
  function handleReturnButton(){
    if (onSwitchToLogin) {
      onSwitchToLogin();
    } else {
      navigate("/");
    }
  }
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <RegisterContainer>
      <Form onSubmit={handleCreateNewUser}>
        <ReturnButton onClick={handleReturnButton} type="button">
          <IoReturnUpBackOutline size={38} />
        </ReturnButton>
        <h1>Register User</h1>
        <div>
          <label htmlFor="firstName">
            <FaUser />
            <span>Primeiro Nome</span>
          </label>
          <input
            type="text"
            placeholder="Digite o primeiro nome"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lastName">
            <FaUser />
            <span>Sobrenome</span>
          </label>
          <input
            type="text"
            placeholder="Digite o sobrenome"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="document">
            <FaIdCard />
            <span>Número de Documento</span>
          </label>
          <input
            type="text"
            placeholder="Digite o número do documento"
            value={document}
            onChange={(event) => setDocument(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">
            <FaEnvelope />
            <span>Email</span>
          </label>
          <input
            type="email"
            placeholder="Digite o email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">
            <FaKey />
            <span>Senha</span>
          </label>
          <PasswordInputContainer>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite a senha"
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

        <div>
          <label htmlFor="balance">
            <FaMoneyBill />
            <span>Saldo Inicial</span>
          </label>
          <input
            min={0}
            type="number"
            placeholder="Digite o saldo inicial"
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="userType">
            <FaUser />
            <span>Tipo de Usuário</span>
          </label>
          <select
            value={userType}
            onChange={(event) => setUserType(event.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="LOJISTA">Lojista</option>
            <option value="COMUM">Comum</option>
          </select>
        </div>

        <RegisterButton
          type="submit"
          onClick={handleCreateNewUser}
          disabled={!isFormValid}
        >
          Registrar
        </RegisterButton>
        
        {onSwitchToLogin && (
          <LoginLink type="button" onClick={onSwitchToLogin}>
            Já possui uma conta? Faça login
          </LoginLink>
        )}
        
        {!isFormValid && (
          <p style={{ color: "red", marginTop: "10px" }}>
            Você deve preencher todos os dados!
          </p>
        )}
      </Form>
    </RegisterContainer>
  );
}
