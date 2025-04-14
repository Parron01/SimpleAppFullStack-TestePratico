import { NavLink } from "react-router-dom";
import { HeaderContainer, HeaderContent, LogOutButton, SignInButton, MobileMenuIcon, MobileMenu, MobileNavLink } from "./Header.styles";
import { FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export function Header(){
  const {isAuthenticated, logOut} = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return(
    <>
      <HeaderContainer>
        <HeaderContent>
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <NavLink 
              to="/"
              title="Users">
              Usuários
            </NavLink>
            <NavLink 
              to="/transactions"
              title="Transactions">
              Transações
            </NavLink>
            <NavLink 
              to="/myTransactions"
              title="MyTransactions">
              Minhas Transações
            </NavLink>
          </nav>

          {/* Mobile Navigation Icon */}
          <MobileMenuIcon onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuIcon>

          {/* Authentication Buttons */}
          {isAuthenticated ? (
            <NavLink to='/'>
              <LogOutButton onClick={()=>logOut()}>
                <span className="button-text">Log Out</span>
                <FaSignOutAlt />
              </LogOutButton>
            </NavLink>
          ) : (
            <NavLink to='/login'>
              <SignInButton>
                <span className="button-text">Login</span>
                <FaSignInAlt />
              </SignInButton>
            </NavLink>
          )}
        </HeaderContent>
      </HeaderContainer>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLink 
          to="/"
          onClick={closeMobileMenu}
          title="Users">
          Usuários
        </MobileNavLink>
        <MobileNavLink 
          to="/transactions"
          onClick={closeMobileMenu}
          title="Transactions">
          Transações
        </MobileNavLink>
        <MobileNavLink 
          to="/myTransactions"
          onClick={closeMobileMenu}
          title="MyTransactions">
          Minhas Transações
        </MobileNavLink>
      </MobileMenu>
    </>
  );
}

