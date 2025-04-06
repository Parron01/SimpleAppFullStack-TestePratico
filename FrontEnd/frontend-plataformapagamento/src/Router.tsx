import { Routes, Route } from "react-router-dom";
import { Users } from "./pages/Users";
import { Transactions } from "./pages/Transactions";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Login } from "./pages/Login";
import { MyTransactions } from "./pages/MyTransactions";
import { AuthGuard } from "./components/AuthGuard/AuthGuard";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />} >
                {/* Protected routes */}
                <Route 
                    path="/" 
                    element={
                        <AuthGuard>
                            <Users />
                        </AuthGuard>
                    } 
                />
                
                <Route 
                    path="/transactions" 
                    element={
                        <AuthGuard>
                            <Transactions />
                        </AuthGuard>
                    } 
                />
                
                <Route 
                    path="/myTransactions" 
                    element={
                        <AuthGuard>
                            <MyTransactions />
                        </AuthGuard>
                    } 
                />
            </Route>
            
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}