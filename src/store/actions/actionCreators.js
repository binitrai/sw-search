import * as actionTypes from "./actionTypes";
import axios from "axios";
import i18 from "../../services/i18.services";
import {reqLimit} from "../../services/util";
import {
    PLANET_SEARCH_URL,
    PEPOLE_SEARCH_URL
} from "../../services/constants";

import {
    login, 
    setLoginInfoInLocalStorage, 
    removeSessionStorage
} from "../../services/userService/loginService";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, userName) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        userName : userName
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = (cb) => {
    removeSessionStorage();
    if (typeof cb === "function") {
        cb();
    }
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (name, password) => {
    return dispatch => {
        dispatch(authStart());
        const url = PEPOLE_SEARCH_URL + name;
        axios.get(url)
        .then(response => {
            const loginResponse = login(name, password, response);
            if (loginResponse.success) {
                setLoginInfoInLocalStorage(loginResponse);
                dispatch(authSuccess(loginResponse.data.id, loginResponse.data.name));
                dispatch(checkAuthTimeout(loginResponse.expiresIn));
            } else  {
                dispatch(authFail(loginResponse.errorMsg));
            }
            
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(i18.somethingWentWrong));
        });
        
    };
};


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const userName = localStorage.getItem('userName');
                dispatch(authSuccess(userId, userName));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};

export const startSearching = () => {
    return {
        type : actionTypes.SEARCH_START
    }
}

export const searchSuccess = (result, next, count, update) => {
    return {
        type : actionTypes.SEARCH_SUCCESS,
        result : result,
        next : next,
        count : count,
        update: update
    }
}

export const searchFail = (msg) => {
    return {
        type : actionTypes.SEARCH_FAIL,
        errMsg : msg,
    }
}
export const fetchPlanet = (query, update = false) => {
    if (query === "") {
        return dispatch => {
            dispatch(searchSuccess([], null, 0, update)) 
        };
    }
    return dispatch => {
        dispatch(startSearching());
        let url = PLANET_SEARCH_URL + query;
        if (reqLimit() === false) {
            dispatch(searchFail(i18.reqLimitExceeds));
        } else {
            if (update) {
                url = query
            }
            
            axios.get(url)
            .then(response => {
                const data = response.data;
                dispatch(searchSuccess(data.results, data.next, data.count, update))
            })
            .catch(err => {
                console.log(err);
                dispatch(searchFail(i18.somethingWentWrong));
            });
        }
        
        
    };
}

export const onSelectPlanet = item => {
    return {
        type : actionTypes.SELECT_PLANET,
        selectedPlanet : item
    }
}