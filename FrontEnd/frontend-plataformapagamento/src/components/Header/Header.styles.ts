import styled from "styled-components";

export const HeaderContainer = styled.div`
    background: ${props => props.theme["gray-800"]};
    border-bottom: 1px solid ${props=>props.theme["gray-600"] };
`

export const HeaderContent = styled.div`
        max-width: 75rem;
        margin: 0 auto;
        height: 5rem;

        display: flex;
        align-items: center;
        justify-content: space-between;
        nav{
            margin-left:2rem;
            
            a{
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
        }

    button{
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
    }
        
`