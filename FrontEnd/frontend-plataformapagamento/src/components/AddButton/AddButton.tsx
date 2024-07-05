import { ReactNode } from "react";
import { Button } from "./AddButton.styles";

interface AddButtonProps{
    children?: ReactNode;
    onClick?: ()=> void;
}

export function AddButton({children,onClick}:AddButtonProps){
    return(
        <Button onClick={onClick}>
            {children}
        </Button>
    );
}