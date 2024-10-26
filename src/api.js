import axios from "axios";
import {API_KEY, AUTH_API_BASE_URL, BASE_API_URL} from "./constants.js";
import {getAuthToken} from "./utils.js";

export const userSignup = (userData) => {
    return axios.post(`${AUTH_API_BASE_URL}signUp?key=${API_KEY}`, userData);
}

export const userLogin = (credentials) => {
    return axios.post(`${AUTH_API_BASE_URL}signInWithPassword?key=${API_KEY}`, credentials);
}

export const getPosts = () => {
    return axios.get(`${BASE_API_URL}posts.json`, {
        params: {
            auth: getAuthToken()
        }
    });
}

export const getPost = (postId) => {
    return axios.get(`${BASE_API_URL}posts/${postId}.json`, {
        params: {
            auth: getAuthToken()
        }
    });
}

export const addNewPost = (postData) => {
    return axios.post(`${BASE_API_URL}posts.json`, postData, {
        params: {
            auth: getAuthToken()
        }
    })
}

export const editPost = (postId, postData) => {
    return axios.patch(`${BASE_API_URL}posts/${postId}.json`, postData, {
        params: {
            auth: getAuthToken()
        }
    })
}

export const deletePost = (postId) => {
    return axios.delete(`${BASE_API_URL}posts/${postId}.json`, {
        params: {
            auth: getAuthToken()
        }
    });
}
