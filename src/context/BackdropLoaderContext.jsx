import {createContext, useState} from "react";

const BackdropLoaderContext = createContext();

const BackdropLoaderProvider = ({children}) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <BackdropLoaderContext.Provider value={{show, setShow}}>
                {children}
            </BackdropLoaderContext.Provider>
        </>
    )
}

export { BackdropLoaderContext, BackdropLoaderProvider };
