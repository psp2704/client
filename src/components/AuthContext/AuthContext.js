import { createContext, useContext , useReducer } from "react";

//craete context
export const authContext = createContext();

//initial state
const INITIAL_STATE = {
    userAuty : false,
    error: null,
    loading: false,
    profile: null,
}

//const reducer 
const AuthReducer = (state , action) =>{
     switch(action.type){
        case 'LOGIN':
            return {...state, userAuth:action.payload};
        case 'LOGOUT': 
            return {...state, };
        default:
            return state;
     }
    }

//create the provider
const AuthConextProvider = ({children}) =>{
    const  [state , dispatch] = useReducer(AuthReducer , INITIAL_STATE);

    return (
        <authContext.Provider value={44}>
            {children}
        </authContext.Provider>
    )
};

export default AuthConextProvider;