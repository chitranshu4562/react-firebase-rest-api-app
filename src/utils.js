import {AUTH_DATA, EXPIRATION_TIME} from "./constants.js";
import {toast} from "react-toastify";

export const storeAuthDataInLocalStorage = (authData) => {
    localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
}

export const getAuthDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(AUTH_DATA));
}

export const storeExpirationTime = (value) => {
    localStorage.setItem(EXPIRATION_TIME, value);
}

export const getExpirationTime = () => {
    return localStorage.getItem(EXPIRATION_TIME);
}

export const removeExpirationTime = () => {
    localStorage.removeItem(EXPIRATION_TIME);
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

export const getCurrentTimeInMS = () => {
    const date = new Date();
    return date.getTime();
}
