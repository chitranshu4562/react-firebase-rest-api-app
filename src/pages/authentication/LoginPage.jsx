import classes from "./Auth.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {userLogin, userSignup} from "../../api.js";
import {
    errorNotification,
    getCurrentTimeInMS,
    storeAuthDataInLocalStorage,
    storeExpirationTime,
    successNotification
} from "../../utils.js";
import {BackdropLoaderContext} from "../../context/BackdropLoaderContext.jsx";
import {AuthDataContext} from "../../context/AuthDataContext.jsx";

export default function LoginPage() {
    const backdropLoaderContext = useContext(BackdropLoaderContext);
    const authDataContext = useContext(AuthDataContext);
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const handleLogin = (event) => {
        event.preventDefault();
        backdropLoaderContext.setShow(true);
        const userData = {
            ...loginForm,
            returnSecureToken: true
        }
        userLogin(userData).then(response => {
            backdropLoaderContext.setShow(false);
            const authData = {
                email: response.data.email,
                userId: response.data.localId,
                authToken: response.data.idToken,
                expirationTime: response.data.expiresIn
            }
            const expirationTimeInMS = getCurrentTimeInMS() + (authData.expirationTime * 1000);
            storeExpirationTime(expirationTimeInMS);
            storeAuthDataInLocalStorage(authData);
            authDataContext.setUser(authData);
            console.log(response);
            successNotification('User is registered successfully');
            handleReset();
            navigate('/');
        }).catch(error => {
            backdropLoaderContext.setShow(false);
            errorNotification(error.response.data.error.message);
            console.log(error);
        });
    }

    const handleReset = () => {
        setLoginForm({
            email: '',
            password: ''
        })
    }


    const handleInputChange = (event) => {
        setLoginForm(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <>
            <div className={classes.authFormContainer}>
                <h1 className="text-center">Login Page</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group my-2">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={loginForm.email}
                            className="form-control"
                            placeholder="Enter email"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group my-2">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={loginForm.password}
                            className="form-control"
                            placeholder="Enter password"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/sign-up">Go to Registration</Link>
                    </div>
                </form>
            </div>
        </>
    )
}
