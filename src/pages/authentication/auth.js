import {getAuthDataFromLocalStorage} from "../../utils.js";
import {redirect} from "react-router-dom";

export const preventAuthPageAfterAuthentication = () => {
    const authData = getAuthDataFromLocalStorage();

    if (authData) {
        return redirect('/');
    }
    return null;
}
