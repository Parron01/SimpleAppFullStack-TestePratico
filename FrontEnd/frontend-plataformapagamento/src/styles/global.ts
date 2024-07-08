import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
:focus{
    outline: 0;
    box-shadow: 0 0 0 2 ${props => props.theme["green-500"]};
}

body{
    background: ${props => props.theme["gray-900"]};
    color: ${props => props.theme["gray-300"]};
}


@media (max-width: 1080px){
    html{
        font-size: 93.75%;
    }
}
@media (max-width: 720px){
    html{
        font-size: 87.5%;
    }
}

button{
    cursor: pointer;
}

a{
    color: inherit;
    text-decoration: none;
}
.react-modal-overlay{
    background-color: rgba(0,0,0,0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

}
.react-modal-content{
    width: 100%;
    max-width: 36rem;
    background-color: ${props=>props.theme["gray-800"]};
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
}
.react-modal-close{
    position: absolute;
    right: 1.2rem;
    top: 1.2rem;
    border: 0;
    background: transparent;

    color: ${props=>props.theme["gray-100"]};

    transition: filter 0.2s;
    &:hover{
        filter: brightness(0.7);
    }
}


.Toastify__toast--error {
    background: ${props => props.theme["red-700"]};
    color: ${props=> props.theme["gray-100"]};
}

.Toastify__toast--success {
    background: ${props => props.theme["green-500"]};
    color: ${props=> props.theme["gray-100"]};
  }
`