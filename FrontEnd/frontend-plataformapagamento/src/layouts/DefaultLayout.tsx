import { Outlet } from "react-router-dom";
import {Header} from "../components/Header/Header";

export function DefaultLayout(){
    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
}

//Outlet é basicamente um espaço aonde deve ser inserido, local aonde o html das paginas que usem esse layout entrarão