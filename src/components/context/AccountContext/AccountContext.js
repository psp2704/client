import axios from 'axios';
import { createContext, useContext, useReducer } from 'react';
import { ACCOUNT_URL } from '../../../utils/apiUrls';
import { AuthContext } from '../AuthContext/AuthContext';

export const AccountContext = createContext();

const initialState = {
    // userAuth: JSON.parse(localStorage.getItem("userAuth")),
    account: null,
    transactions: [],
    error: null,
    loading: null,
}

const accountReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "FETCH_ACCOUNT_SUCCESS": {
            return {
                ...state,
                account: payload,
                accounts: [],
                transactions: payload?.transactionData,
                loading: false
            };
        }
        case "FETCH_ACCOUNT_FAIL": {
            return {
                ...state,
                error: payload,
                loading: false
            }
        }
        case "ACCOUNT_CREATED_SUCCESS": {
            return {
                ...state,
                account: payload,
                accounts: [],
                transactions: payload?.transactionData,
                loading: false
            }
        }

        case "ACCOUNT_DELETED_SUCCESS": {
            return {
                ...state,
                account: payload,
                accounts: [],
                transactions: payload?.transactionData,
                loading: false
            }
        }

        case "ACCOUNT_UPDATED_SUCCESS": {
            return {
                ...state,
                account: payload,
                accounts: [],
                transactions: payload?.transactionData,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}

export const AccountContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const {token} = useContext(AuthContext)

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    // create account actions
    const createAccount = async (formdata) => {

        try {
            const res = await axios.post(ACCOUNT_URL, formdata, config);
            if (res?.data?.account?.status === 'success') {
                dispatch({
                    type: 'ACCOUNT_CREATED_SUCCESS',
                    payload: res?.data?.account
                })
            }
           
            //redirect to dashboard
            // window.location.href = "/dashboard"

        } catch (error) {
            dispatch({
                type: 'FETCH_ACCOUNT_FAIL',
                payload: error?.response?.data?.message
            })
        }
    }

        //Account Update
        const updateAccount = async (formdata, id, navigate) => {
            const res = await axios.put(`${ACCOUNT_URL}/${id}`, formdata, config);
            try {
                if (res?.data?.status === "success") {
                    dispatch({
                        type: "ACCOUNT_UPDATED_SUCCESS",
                        payload: res?.data?.account
                    });
    
                    //redirect to dashboard
                    navigate("/dashboard")
                }
            } catch (error) {
                dispatch({
                    type: "FETCH_ACCOUNT_FAIL",
                    payload: error.message
                })
            }
        }

    //fetch singel account 
    const getSingleAccount = async (id) => {

        try {
            const res = await axios.get(`${ACCOUNT_URL}/${id}`, config);
            if (res?.data?.status === 'success') {
                dispatch({
                    type: "FETCH_ACCOUNT_SUCCESS",
                    payload: res?.data?.account
                });
            }
        } catch (error) {
            dispatch({
                type: "FETCH_ACCOUNT_FAIL",
                payload: error.message
            })
        }
    }

    // delete account
    const deleteAccount = async (id) => {
        const res = await axios.delete(`${ACCOUNT_URL}/${id}`, config);
        try {
            if (res?.data?.status === "success") {
                dispatch({
                    type: "ACCOUNT_DELETED_SUCCESS",
                    payload: res?.data?.account
                })
            }

            //redirect to dashboard
            window.location.href = "/dashboard"

        } catch (error) {
            dispatch({
                type: "FETCH_ACCOUNT_FAIL",
                payload: error.message
            })
        };
    }

    return (
        <AccountContext.Provider value={{ state, account: state?.account, getSingleAccount, createAccount, deleteAccount, updateAccount }}>
            {children}
        </AccountContext.Provider>
    )
}
