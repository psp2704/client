import { createContext, useReducer } from "react";
import axios from 'axios';
import { TRANSACTION_URL } from "../../../utils/apiUrls";

export const TransactionContext = createContext();

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    transactions: [],
    error: null,
    loading: null,
}

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "TRANSACTION_CREATED_SUCCESS":
            return {
                ...state, ...payload.transaction
            };

        case "TRANSACTION_UPDATED_SUCCESS":
            return {
                ...state,
            }
        case "TRANSACTION_UPDATED_SUCCESS":
            return {
                ...state,
            }
        case  "FAILED_ERROR" :
            return  {
                ...state,
                error : payload
            }
            
        default:
            return state;
    }
}

export const TransactionProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const config = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`
    }

    const deleteTransaction = async (id) => {
        const res = await axios.delete(`${TRANSACTION_URL}/${id}`, config);

        try {
            if (res?.data?.status === 'success') {
            //     dispatch({
            //         type:
            // })
            console.log(res.data)
            }
        } catch (error) {
            dispatch({
                type: 'FAILED_ERROR',
                payload: error?.response?.data?.message
            })
        }
    }

    return (
        <TransactionContext.Provider value={{ deleteTransaction }} >
            {children}
        </TransactionContext.Provider>
    )
}