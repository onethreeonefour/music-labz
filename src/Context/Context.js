import { createContext, useState } from 'react';

//Create Context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [global, setglobal] = useState({
        token: ''
    })

    return (
        <GlobalContext.Provider
            value={{
                ...global,
                setglobal: setglobal
            }}>
            {children}
        </GlobalContext.Provider>
    );

}