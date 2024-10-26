import {createContext, useState} from "react";

const AuthDataContext = createContext();

const AuthDataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthDataContext.Provider value={{ user, setUser }}>
            { children }
        </AuthDataContext.Provider>
    )
}

export { AuthDataContext, AuthDataProvider };
