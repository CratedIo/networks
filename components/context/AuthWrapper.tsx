'use client'

import { createContext, useContext, useEffect, useState } from "react";

type Context = {
    name:string;
    setName:string;
}

const AuthContext = createContext<any>(undefined);

export function AuthWrapper({ children } : {
    children: React.ReactNode;
}) {

    let [name, setName] = useState('Arron')

    return (
        <AuthContext.Provider value={{
            name,
            setName
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuthContext(){
    return useContext(AuthContext)
}