import { FaUser, FaEnvelope, FaKey, FaMoneyBill, FaIdCard } from 'react-icons/fa';
import { RegisterContainer, Form} from './RegisterUserForm.styles';

export function RegisterUserForm(){
    return (
        <RegisterContainer>
          <Form >
            <h1>Register User</h1>
            <div>
              <label htmlFor="firstName">
                <FaUser />
                <span>Primeiro Nome</span>
              </label>
              <input id="firstName" type="text" placeholder="Digite o primeiro nome" />
            </div>
    
            <div>
              <label htmlFor="lastName">
                <FaUser />
                <span>Sobrenome</span>
              </label>
              <input id="lastName" type="text" placeholder="Digite o sobrenome" />
            </div>
    
            <div>
              <label htmlFor="document">
                <FaIdCard />
                <span>Número de Documento</span>
              </label>
              <input id="document" type="text" placeholder="Digite o número do documento" />
            </div>
    
            <div>
              <label htmlFor="email">
                <FaEnvelope />
                <span>Email</span>
              </label>
              <input id="email" type="email" placeholder="Digite o email" />
            </div>
    
            <div>
              <label htmlFor="password">
                <FaKey />
                <span>Senha</span>
              </label>
              <input id="password" type="password" placeholder="Digite a senha" />
            </div>
    
            <div>
              <label htmlFor="balance">
                <FaMoneyBill />
                <span>Saldo Inicial</span>
              </label>
              <input id="balance" type="number" placeholder="Digite o saldo inicial" />
            </div>
    
            <div>
              <label htmlFor="userType">
                <FaUser />
                <span>Tipo de Usuário</span>
              </label>
              <select id="userType">
                <option value="">Selecione o tipo</option>
                <option value="LOJISTA">Lojista</option>
                <option value="COMUM">Comum</option>
              </select>
            </div>
    
            <button type="submit">Registrar</button>
          </Form>
        </RegisterContainer>
      );
    };
    