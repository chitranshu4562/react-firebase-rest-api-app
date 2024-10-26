import {useContext, useState} from "react";
import classes from "./Auth.module.css";
import {BackdropLoaderContext} from "../../context/BackdropLoaderContext.jsx";
import {userSignup} from "../../api.js";
import {Link, useNavigate} from "react-router-dom";
import {errorNotification, storeAuthDataInLocalStorage, successNotification} from "../../utils.js";
import {AuthDataContext} from "../../context/AuthDataContext.jsx";

export default function SignupPage() {
    const backdropLoaderContext = useContext(BackdropLoaderContext);
    const authDataContext = useContext(AuthDataContext);
    const navigate = useNavigate();
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setSignupForm(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSignup = (event) => {
        event.preventDefault();
        backdropLoaderContext.setShow(true);
        const userData = {
            ...signupForm,
            returnSecureToken: true
        }
        userSignup(userData).then(response => {
            backdropLoaderContext.setShow(false);
            const authData = {
                email: response.data.email,
                userId: response.data.localId,
                authToken: response.data.idToken,
                expirationTime: response.data.expiresIn
            }
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
        setSignupForm({
            email: '',
            password: ''
        })
    }

    return (
        <>
            <div className={classes.authFormContainer}>
                <h1 className="text-center">Signup Page</h1>
                <form onSubmit={handleSignup}>
                    <div className="form-group my-2">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={signupForm.email}
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
                            value={signupForm.password}
                            className="form-control"
                            placeholder="Enter password"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/login">Go to Login</Link>
                    </div>
                </form>
            </div>
        </>
    )
}
