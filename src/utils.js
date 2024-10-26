import {AUTH_DATA} from "./constants.js";
import {toast} from "react-toastify";

export const storeAuthDataInLocalStorage = (authData) => {
    localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
}

export const getAuthDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(AUTH_DATA));
}

export const removeAuthDataFromLocalStorage = () => {
    localStorage.removeItem(AUTH_DATA);
}

export const getAuthToken = () => {
    const authData = getAuthDataFromLocalStorage();
    return authData?.authToken;
}

export const successNotification = (message) => {
    toast.success(message);
}

export const errorNotification = (message) => {
    toast.error(message);
}
