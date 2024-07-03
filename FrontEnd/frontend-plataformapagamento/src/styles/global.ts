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


`