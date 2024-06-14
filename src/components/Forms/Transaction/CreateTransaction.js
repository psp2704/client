import React, { useContext, useState } from 'react';
import { TransactionContext } from '../../context/TransactionContext/TransactionContext';
import { useNavigate, useParams } from 'react-router-dom';
import RequiredLabel from '../../../utils/RequiredLabel';

function CreateTransaction() {
  const { accountID } = useParams();
  const navigate = useNavigate();
  const transactionTypes = ["Income", "Expense"];
  const categories = [
    'Saving',
    'Travel',
    'Investment',
    'Checking',
    'Building',
    'School',
    'Utilities',
    'Loan',
    'Cash',
    'Groceries',
  ];
  const { state, createTransaction } = useContext(TransactionContext);
  const [formdata, setFormdata] = useState({
    transactName: "",
    transactionType: "",
    amount: "",
    category: "",
    notes: "",
    account: accountID
  });

  const { transactName, transactionType, amount, category} = formdata;

  const onChangeInput = (e) => {
    return setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(formdata, accountID);
      navigate(`/account-details/${accountID}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col my-24 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Create Transaction
            </h1>
            {state?.error && (
              <p className="text-red-500 text-center">{state?.error}</p>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <RequiredLabel htmlFor="transactName">Name</RequiredLabel>
                <input
                  onChange={onChangeInput}
                  value={transactName}
                  type="text"
                  name="transactName"
                  id="transactName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <RequiredLabel htmlFor="transactionType">Type</RequiredLabel>
                <select
                  onChange={onChangeInput}
                  value={transactionType}
                  name="transactionType"
                  id="transactionType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                >
                  <option value="">Select Transaction Type</option>
                  {transactionTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <RequiredLabel htmlFor="amount">Amount</RequiredLabel>
                <input
                  onChange={onChangeInput}
                  value={amount}
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="0000"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <RequiredLabel htmlFor="category">Category</RequiredLabel>
                <select
                  onChange={onChangeInput}
                  value={category}
                  name="category"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div>
                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                <input
                  onChange={onChangeInput}
                  value={notes}
                  type="text"
                  name="notes"
                  id="notes"
                  placeholder="#travel..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                 
                />
              </div> */}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateTransaction;
