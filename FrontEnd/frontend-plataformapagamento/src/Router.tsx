import { Routes, Route } from "react-router-dom";
import { Users } from "./pages/Users";
import { Transactions } from "./pages/Transactions";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>} >
            <Route path="/" element={<Users/>}/>
            <Route path="/transactions" element={<Transactions/>}/>
            </Route>
        </Routes>
    );
  }
  