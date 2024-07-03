import { NavLink } from "react-router-dom";
import { HeaderContainer, HeaderContent } from "./Header.styles";
import { FaSignInAlt } from 'react-icons/fa';

export function Header(){
    return(
        <>
        <HeaderContainer>
            <HeaderContent>
                <nav>
                    <NavLink 
                    to="/"
                    title="Users">
                    Users</NavLink>
                    <NavLink 
                    to="/transactions"
                    title="Transactions">
                    Transactions</NavLink>
                    <NavLink 
                    to="/"
                    title="MyTransactions">
                    MyTransactions</NavLink>
                </nav>
                <NavLink to='/login'>
                <button>Login
                    <FaSignInAlt/>
                </button>
                </NavLink>
            </HeaderContent>
        </HeaderContainer>
        </>
    );
}

