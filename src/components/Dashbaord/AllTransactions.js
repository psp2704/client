import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext/TransactionContext";
import { AccountContext } from "../context/AccountContext/AccountContext";

const AllTransactions = ({ accountID, response, transactions}) => {
  const { deleteTransaction} = useContext(TransactionContext);
  // const {state} = useContext(AccountContext)
  // const [updatedTransactions, setUpdatedTransactions] = useState([...state.transactions]);

  // const handleDelete = async (id) => {
  //   // if (window.confirm("Are you sure? This cannot be undone.")) {
  //     await deleteTransaction(id);
  //     // setUpdatedTransactions(transactions.filter((t) => t._id !== id));
  //     setUpdatedTransactions([...state.transactions])
  //     // alert("Transaction Deleted Successfully");
  //   // }
  // };

  // console.log(state.transactions, updatedTransactions)

  // useEffect(() => {
  //   setUpdatedTransactions(updatedTransactions);
  // }, [updatedTransactions]);


  const handleDelete = async (id) =>{
     if (window.confirm("Are you sure? This cannot be undone.")) {
      await deleteTransaction(id);
      // setUpdatedTransactions(transactions.filter((t) => t._id !== id));
      // setUpdatedTransactions([...state.transactions])
      // alert("Transaction Deleted Successfully");
       await response(accountID);
     }

  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gray-100">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              All Transactions
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              All transactions including expenses and income for this account
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to={`/create-transaction/${accountID}`}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add New Transaction
            </Link>
          </div>
        </div>
        {transactions?.length !== 0 ? (
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Note
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {transactions?.map((transaction) => (
                        <tr
                          key={transaction?._id}
                          className={transaction?.color}
                        >
                          <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm ">
                            <div className="font-medium text-gray-900">
                              {transaction?.name}
                            </div>
                          </td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {transaction?.transactionType}
                            </div>
                          </td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              $ {transaction?.amount}
                            </span>
                          </td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                            {transaction?.notes}
                          </td>
                          <td className="relative w-1/5 whitespace-nowrap text-center py-4 pl-3 pr-4  text-sm font-medium sm:pr-6">
                          <Link to={`/update-transaction/${transaction?._id}`}>
                            <button className="border-2 text-center border-gray-300 px-4 py-2 rounded-lg text-indigo-600 hover:text-indigo-900 hover:border-indigo-900">
                              Edit
                            </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(transaction?._id)}
                              className="border-2 text-center border-gray-300 ml-3 px-4 py-2 rounded-lg text-red-400 hover:text-red-700 hover:border-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center bg-white mt-4 px-2 py-5 rounded-xl shadow-lg w-full text-gray-700">
            No transactions yet. Please add a transaction to see it here.
          </div>
        )}
      </div>
    </>
  );
};

export default AllTransactions;
