import { createContext, useContext, useReducer } from "react";

// Create context
export const AuthContext = createContext();

// Initial state
const INITIAL_STATE = {
    userAuth: false,
    error: null,
    loading: false,
    profile: null,
};

// Reducer function
export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, userAuth: action.payload };
        case 'LOGOUT':
            return { ...state, userAuth: false };
        default:
            return state;
    }
};

// Create the provider
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
