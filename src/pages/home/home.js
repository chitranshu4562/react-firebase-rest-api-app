import {getAuthDataFromLocalStorage} from "../../utils.js";
import {redirect} from "react-router-dom";

export const preventHomeWithoutAuthentication = () => {
    const authData = getAuthDataFromLocalStorage();

    if (!authData) {
        return redirect('/login');
    }
    return null;
}
