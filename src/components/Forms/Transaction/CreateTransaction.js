import React, { useContext, useState } from 'react'
import { AccountContext } from '../../context/AccountContext/AccountContext';

function CreateTransaction() {

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

  const { state, createAccount } = useContext(AccountContext);

  const [formdata, setFormdata] = useState({
    transactionName: "",
    transactionType : "",
    amount: "",
    category : "",
    notes: "",
   
  });

  const { transactionName, transactionType, amount, category, notes, } = formdata;

  const onChangeInput = (e) => {
    console.log(e.target.name, e.target.value);
    return setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  //handle the submit form 
  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount(formdata);
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col my-24  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                <label htmlFor="trasactionName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction Name</label>
                <input onChange={onChangeInput} value={transactionName} type="text" name="trasactionName" id="trasactionName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="John Doe" required="" />
              </div>
              <div>
                <label
                  htmlFor="transactionType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Transaction Type
                </label>
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
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                <input onChange={onChangeInput} value={amount} type="number" name="amount" id="initialBalance" placeholder="0000" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label
                  htmlFor="transactionType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Transaction Type
                </label>
                <select
                  onChange={onChangeInput}
                  value={category}
                  name="transactionType"
                  id="transactionType"
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
              <div>
                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                <input onChange={onChangeInput} value={notes} type="text" name="notes" id="notes" placeholder="#travel..." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Transaction</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateTransaction