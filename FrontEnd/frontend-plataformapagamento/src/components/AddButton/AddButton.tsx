import { ReactNode } from "react";
import { Button } from "./AddButton.styles";

interface AddButtonProps{
    children: ReactNode;
}

export function AddButton({children}:AddButtonProps){
    return(
        <Button>
            {children}
        </Button>
    );
}