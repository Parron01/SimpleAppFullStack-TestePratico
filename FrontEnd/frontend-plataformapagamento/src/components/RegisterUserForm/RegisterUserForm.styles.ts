import styled from 'styled-components';

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  background-color: ${props => props.theme['gray-900']};
  `;

export const Form = styled.form`
  background-color: ${props => props.theme['gray-800']};
  padding: 2rem 4rem;
  border-radius: 10px;
  max-width: 38rem;
  width: 100%;
  margin: 2rem;
  position: relative;
  
  h1 {
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }
    
    div {
        margin-bottom: 1rem;
    }
    
    input, select {
        width: 100%;
        padding: 0.75rem;
        border-radius: 5px;
        margin-top: 0.25rem;
        background-color: ${props => props.theme['gray-700']};
        color: ${props => props.theme['gray-500']};
        border: 1px solid ${props=>props.theme['gray-600']};
    }
    
    label {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      font-size: 1.2rem;
    }
  }

  
`;
export const RegisterButton = styled.button`

    width: 100%;
    padding: 0.75rem;
    background-color: ${props => props.disabled ? props.theme['gray-600']: props.theme['blue-700']};
    color: ${props => props.theme['gray-100']};
    border: none;
    border-radius: 5px;
    margin-top: 1rem;

    &:hover {
      background-color: ${props => props.disabled ? props.theme['gray-500']: props.theme['blue-500']};
      color: ${props =>props.theme.white}
    }


`;

export const ReturnButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.35rem;
    border: 0;
    border-radius: 0.5rem;
    background: ${props=>props.theme['gray-600']};
    color:${props=>props.theme['gray-100']} ;

    transition: filter 0.2s;
    &:hover{
        filter: brightness(0.7);
    }
`;
