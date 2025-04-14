import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

export const HeaderContainer = styled.div`
    background: ${props => props.theme["gray-800"]};
    border-bottom: 1px solid ${props=>props.theme["gray-600"] };
    position: relative;
    z-index: 1000;
`;

export const HeaderContent = styled.div`
    max-width: 75rem;
    margin: 0 auto;
    height: 5rem;
    padding: 0 1rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    nav.desktop-nav {
        margin-left: 2rem;
        
        a {
            padding: 0.5rem 2rem;
            font-size: 1.3rem;
            border-bottom: 1px solid transparent;
            line-height: 3rem;
            color: ${props=>props.theme["gray-400"]};
            
            & + a{
                border-left: 1px solid ${props=>props.theme["gray-600"] };
                margin-right: 10px;
            }
            transition: color 0.3s;
            &:hover{
                color: ${props=>props.theme["gray-300"] };
            }
            &.active{
                color: ${props=> props.theme["gray-100"]};
            }
        }

        @media (max-width: 768px) {
            display: none;
        }
    }
`;

export const MobileMenuIcon = styled.div`
    display: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: ${props => props.theme["gray-100"]};
    
    @media (max-width: 768px) {
        display: block;
        margin-left: 1rem;
    }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        background: ${props => props.theme["gray-800"]};
        position: absolute;
        top: 5rem;
        left: 0;
        width: 100%;
        z-index: 999;
        padding: 1rem 0;
        border-bottom: 1px solid ${props => props.theme["gray-600"]};
        transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-150%)'};
        opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
        transition: all 0.3s ease-in-out;
    }
`;

export const MobileNavLink = styled(RouterNavLink)`
    padding: 1rem 2rem;
    font-size: 1.2rem;
    color: ${props => props.theme["gray-400"]};
    text-decoration: none;
    border-bottom: 1px solid ${props => props.theme["gray-700"]};
    transition: background 0.3s;
    
    &:hover {
        background: ${props => props.theme["gray-700"]};
        color: ${props => props.theme["gray-300"]};
    }
    
    &.active {
        color: ${props => props.theme["gray-100"]};
        background: ${props => props.theme["gray-700"]};
        border-left: 4px solid ${props => props.theme["blue-700"]};
    }
`;

export const SignInButton = styled.button`
    font-size: 1.1rem;
    
    padding: 0.7rem 3rem;
    background: ${props=>props.theme["green-500"]};
    color: ${props=>props.theme["gray-100"]};
    border-radius: 0.4rem;
    border: 1px solid ${props=>props.theme["green-700"]};
    
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    margin-right: 1rem;
    
    transition: background 0.3s;
    &:hover{
        color: ${props=>props.theme["white"]};
        background: ${props=>props.theme["green-300"]};
    }

    @media (max-width: 768px) {
        padding: 0.7rem 1rem;
        font-size: 0.9rem;
        margin-right: 0;
        
        .button-text {
            display: none;
        }
    }
`;

export const LogOutButton = styled.button`
    font-size: 1.1rem;
    
    padding: 0.7rem 3rem;
    background: ${props=>props.theme["red-500"]};
    color: ${props=>props.theme["gray-100"]};
    border-radius: 0.4rem;
    border: 1px solid ${props=>props.theme["red-700"]};
    
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    margin-right: 1rem;
    
    transition: background 0.3s;
    &:hover{
        color: ${props=>props.theme["white"]};
        background: ${props=>props.theme["red-300"]};
    }

    @media (max-width: 768px) {
        padding: 0.7rem 1rem;
        font-size: 0.9rem;
        margin-right: 0;
        
        .button-text {
            display: none;
        }
    }
`;