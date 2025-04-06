import { NavLink } from "react-router-dom";
import { HeaderContainer, HeaderContent, LogOutButton, SignInButton } from "./Header.styles";
import { FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";

export function Header(){
const {isAuthenticated, logOut} = useAuth();

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
                    to="/myTransactions"
                    title="MyTransactions">
                    MyTransactions</NavLink>
                </nav>

                {isAuthenticated ? (
                    <NavLink to='/'>
                        <LogOutButton onClick={()=>logOut()}>
                            Log Out
                            <FaSignOutAlt />
                        </LogOutButton>
                    </NavLink>
                    ) : (
                        <NavLink to='/login'>
                            <SignInButton>
                                Login
                                <FaSignInAlt />
                            </SignInButton>
                        </NavLink>
                    )}

            </HeaderContent>
        </HeaderContainer>
        </>
    );
}

