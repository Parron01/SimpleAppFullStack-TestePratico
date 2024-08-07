import { createContext, ReactNode, useContext, useState } from "react";


interface SignInCredentials{
    document: String,
    password: String
}

interface UserInfoData{
    token:String,
    AuthenticatedUserId: String
}

interface AuthProviderProps {
    children: ReactNode;
  }

interface AuthContextData{
    isAuthenticated: boolean,
    AuthenticatedUserInfo: UserInfoData,
    signIn: ({document, password}:SignInCredentials)=>void;
    logOut: ()=> void;
}

const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);





export function AuthProvider({children}:AuthProviderProps){
    const [isAuthenticated,setisAuthenticated] = useState(false);
    const [AuthenticatedUserInfo,setAuthenticatedUserInfo] = useState<UserInfoData>({
        token:'',
        AuthenticatedUserId: ''
    });

    function signIn({document, password}:SignInCredentials){
        console.log(`Documento = ${document} Senha = ${password}`)
        setisAuthenticated(true);
    }

    function logOut(){
        setisAuthenticated(false);
    }

    return(
        <AuthContext.Provider
        value={{isAuthenticated,AuthenticatedUserInfo, signIn, logOut}}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}