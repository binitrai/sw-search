import * as actionTypes from "./actions/actionTypes";

const initialState = {
    authState : 0,
    loading : false,
    error : false,
    userId : "",
    userName : "",
    nextUrl : null,
    count : 0,
    searchResult : [],
    searchError : false,
    selectedPlanet : false
}

const reducer = (state= initialState, action) => {
        switch(action.type) {
            case actionTypes.AUTH_FAIL : 
                return {
                    ...state,
                    authState : 2,
                    error : action.error

                }
            case actionTypes.AUTH_START : 
                return {
                    ...state,
                    authState : 1

                }
            case actionTypes.AUTH_SUCCESS : 
                return {
                    ...state,
                    authState : 3,
                    userId : action.userId,
                    userName : action.userName,
                    error : false
                }
            case actionTypes.AUTH_LOGOUT : 
                return {
                    ...state,
                    authState : 0,
                    userId : "",
                    userName : "",
                }    
            case actionTypes.SEARCH_START : 
                return {
                    ...state,
                    loading : true,
                }
            case actionTypes.SEARCH_SUCCESS : 
                return {
                    ...state,
                    count : action.count,
                    nextUrl : action.next,
                    searchResult : action.update ? [...state.searchResult, ...action.result] : action.result,
                    loading : false,
                    searchError : false,
                    selectedPlanet : false
                }
            case actionTypes.SEARCH_FAIL : 
                return {
                    ...state,
                    count : 0,
                    nextUrl : null,
                    searchResult : [],
                    loading : false,
                    searchError : action.errMsg,
                    selectedPlanet : false
                }
            case actionTypes.SELECT_PLANET :
                return {
                    ...state,
                    selectedPlanet : action.selectedPlanet
                }
            default :
                return state; 
        }
}

export default reducer;