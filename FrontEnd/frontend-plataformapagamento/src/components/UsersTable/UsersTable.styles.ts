import styled from "styled-components";

export const UsersTableContainer = styled.div`
    max-width: 84rem;
    margin: 3rem auto 0;
    overflow-x: auto;

    table{
        width: 100%;
        border-spacing: 0 0.5rem;
        border: 1px solid ${props=> props.theme["gray-700"]};
        border-radius: 0.5rem;
        padding:1rem 0.5rem;
        th{
            color: ${props=>props.theme.white};
            font-weight: 400;
            font-size: 1.2rem;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1rem;
            & + th{
                border-left: 1px solid ${props=>props.theme["gray-600"]};
            }
            &:nth-last-child(2){
                width: 1.5rem;
            }
            &:last-child{
                width: 1.5rem;
            }
        }
        td{
            padding: 1rem 2rem;
            background: ${props=>props.theme["gray-800"]};
            
            &:first-child{
                color: ${props=>props.theme.white};
            }

            &:nth-last-child(2){
                width: 1.5rem;
                border-left: 0.6rem solid transparent;
                background: ${props=>props.theme["gray-900"]};
                color: ${props=>props.theme["blue-700"]};
                transition: color 0.3s;
                &:hover{
                    color: ${props=>props.theme["blue-500"]};
                }
            }

            &:last-child{
                width: 1.5rem;
                border-left: 0.6rem solid transparent;
                background: ${props=>props.theme["gray-900"]};
                color: ${props=>props.theme["red-700"]};
                transition: color 0.3s;
                &:hover{
                    color: ${props=>props.theme["red-500"]};
                }
            }
        }
        
    }

    button{
        margin: 0 0 1rem auto;
        padding: 1rem 3rem;
        background: ${props=>props.theme["green-500"]};
        color: ${props=>props.theme["gray-100"]};
        border-radius: 0.4rem;
        border: 1px solid ${props=>props.theme["green-700"]};

        display: flex;
        align-items: right;
        gap: 0.5rem;

        font-size: 1.1rem;

        transition: background 0.3s;
        &:hover{
            color: ${props=>props.theme["white"]};
            background: ${props=>props.theme["green-300"]};
        }

    }
        
`;
        