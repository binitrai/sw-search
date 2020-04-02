import {
    getExpDate,
    getId
} from "../util";
import i18 from "../i18.services";

const login = (name, password, response) => {
    const data = response.data;
    if (data.count === 1) {
        let userData = data.results[0];
        let isUserMatched = userData.name.toLowerCase() === name.toLowerCase();
        let isPasswordMatched = userData.birth_year === password;
        if (isUserMatched && isPasswordMatched) {
            return {
                success : true,
                data : userData,
                expiresIn : 3600
            }
        }
        if (isPasswordMatched) {
            return loginFailed(1);
        }
        if (isUserMatched) {
            return loginFailed(2);
        }
    }
    return loginFailed(1)
}

const loginFailed = type => {
    const err = {
        1 : i18.userNameMisMatched,
        2 : i18.passwordMissmatch,
    }
    return {
        success : false,
        errorMsg : err[type]
    }
}

const setLoginInfoInLocalStorage = (data) => {
    localStorage.setItem('expirationDate', getExpDate(data.expiresIn));
    localStorage.setItem('userId', getId(data.data.url));
    localStorage.setItem('userName', data.data.name);
}


const removeSessionStorage = () => {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
}

export {
    login,
    setLoginInfoInLocalStorage,
    removeSessionStorage,
}