import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BackdropLoaderProvider} from "./context/BackdropLoaderContext.jsx";
import {AuthDataProvider} from "./context/AuthDataContext.jsx";

createRoot(document.getElementById('root')).render(
    <BackdropLoaderProvider>
        <AuthDataProvider>
            <App />
        </AuthDataProvider>
    </BackdropLoaderProvider>,
)
