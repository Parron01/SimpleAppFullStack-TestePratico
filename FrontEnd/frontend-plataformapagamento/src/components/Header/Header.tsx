import { HeaderContainer, HeaderContent } from "./Header.styles";
import { FaSignInAlt } from 'react-icons/fa';

export function Header(){
    return(
        <>
        <HeaderContainer>
            <HeaderContent>
                <nav>
                    <a href="/">Users</a>
                    <a href="/transactions">Transactions</a>
                    <a href="/">MyTransactions</a>
                </nav>
                <button>Login
                    <FaSignInAlt/>
                </button>
            </HeaderContent>
        </HeaderContainer>
        </>
    );
}

