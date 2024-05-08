import { createContext, useReducer } from "react";
import axios from 'axios';
import { TRANSACTION_URL } from "../../../utils/apiUrls";
import { redirect } from "react-router-dom";

export const TransactionContext = createContext();

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    transaction: null,
    error: null,
    loading: false,
}

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "FETCH_TRANSACTIONS_SUCCESS":
            return {
                ...state,
                transaction: payload,
                loading: false,
                error: null
            };

        case "FETCH_TRANSACTIONS_FAIL":
            return {
                ...state,
                error: payload,
                loading: false
            }

        case "TRANSACTION_CREATED_SUCCESS":
            return {
                ...state,
                // transaction: [...state.transaction, payload],
                transaction: payload,
                loading: false,
                error: null
            };

            case "TRANSACTION_UPDATED_SUCCESS":
                return {
                    ...state,
                    transaction:  payload,
                    loading: false,
                    error: null
                };

        case "TRANSACTION_DELETED_SUCCESS":
            return {
                ...state,
                transaction: payload,
                // transaction: state.transaction.filter(transaction => transaction.id !== payload),
                loading: false,
                error: null
            };

        case "FAILED_ERROR":
            return {
                ...state,
                error: payload,
                loading: false
            };

        default:
            return state;
    }
}

export const TransactionProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state?.userAuth?.token}`
        }
    }

    const fetchTransaction = async (id) => {
        try {
            const res = await axios.get(`${TRANSACTION_URL}/${id}`, config);
            // dispatch({
            //     type: 'FETCH_TRANSACTIONS_SUCCESS',
            //     payload: res.data
            // });

            console.log(res.data)
        } catch (error) {
            dispatch({
                type: 'FETCH_TRANSACTIONS_FAIL',
                payload: error?.response?.data?.message
            });
        }
    }

    const createTransaction = async (formData, accountID) => {
        try {
            const res = await axios.post(TRANSACTION_URL, formData, config);
            dispatch({
                type: 'TRANSACTION_CREATED_SUCCESS',
                payload: res.data
            });

        //    window.location.href = `/dashboard/${accountID}`
        
        } catch (error) {
            dispatch({
                type: 'FAILED_ERROR',
                payload: error?.response?.data?.message
            });
        }
    }

    const updateTransaction = async (formdata, id) => {
        try {
            const res = await axios.update(`${TRANSACTION_URL}/${id}`, formdata, config);
            dispatch({
                type: 'TRANSACTION_UPDATED_SUCCESS',
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: 'FAILED_ERROR',
                payload: error?.response?.data?.message
            });
        }
    }

    const deleteTransaction = async (id) => {
        try {
            const res = await axios.delete(`${TRANSACTION_URL}/${id}`, config);
            dispatch({
                type: 'TRANSACTION_DELETED_SUCCESS',
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'FAILED_ERROR',
                payload: error?.response?.data?.message
            });
        }
    }

    return (
        <TransactionContext.Provider value={{ state, fetchTransaction, createTransaction, updateTransaction, deleteTransaction }} >
            {children}
        </TransactionContext.Provider>
    )
}
