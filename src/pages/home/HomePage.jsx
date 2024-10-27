import {
    getAuthDataFromLocalStorage, getCurrentTimeInMS,
    getExpirationTime,
    removeAuthDataFromLocalStorage,
    removeExpirationTime
} from "../../utils.js";
import {Outlet, redirect, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthDataContext} from "../../context/AuthDataContext.jsx";
import classes from "./HomePage.module.css";

export default function HomePage() {
    const {user, setUser} = useContext(AuthDataContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        removeExpirationTime();
        removeAuthDataFromLocalStorage();
        navigate('/login');
    }

    useEffect(() => {
        if (!user) {
            const authData = getAuthDataFromLocalStorage();
            setUser(authData);
        }
    }, []);

    useEffect(() => {
        const currentExpirationTime = getExpirationTime() - getCurrentTimeInMS();
        console.log('current expiration time: ',currentExpirationTime);

        if (currentExpirationTime < 0) {
            handleLogout();
        }

        const timer = setInterval(handleLogout, currentExpirationTime);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <>
            {user && (
                <div className={`container-fluid my-2`}>
                    <div className={classes.navBar}>
                        <h4>{user.email}</h4>
                        <button
                            className="btn btn-primary"
                            onClick={handleLogout}
                        >Logout
                        </button>
                    </div>
                    <div className={classes.homeContainer}>
                        <Outlet/>
                    </div>
                </div>
            )}
        </>
    )
}
