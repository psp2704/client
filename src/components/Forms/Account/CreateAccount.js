import React, { useContext, useState } from 'react'
import { AccountContext } from '../../context/AccountContext/AccountContext';

function CreateAccount() {

  const { state, getAccount } = useContext(AccountContext)

  const [formdata, setFormdata] = useState({
    accountName: "",
    initialBalance: "",
    notes: ""
  });

  const { accountName, initialBalance, notes } = formdata;

  const onChangeInput = (e) => {
    console.log(e.target.name, e.target.value);
    return setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  //handle the submit form 
  const handleSubmit = (e) => {
    e.preventDefault();
    getAccount(formdata);
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Create Account
            </h1>
            {state?.error && (
                    <p className="text-red-500 text-center">{state?.error}</p>
                  )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="accountName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Name</label>
                <input onChange={onChangeInput} value={accountName} type="text" name="accountName" id="accountName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="John Doe" required="" />
              </div>
              <div>
                <div htmlFor="accountType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Type</div>
                <div className="flex items-center mb-4">
                  <input onChange={onChangeInput} id="disabled-radio-1" type="radio" value="Cash" name="accountType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="disabled-radio-1" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer">Cash</label>
                </div>
                <div className="flex items-center mb-4">
                  <input onChange={onChangeInput} id="disabled-radio-2" type="radio" value="Loan" name="accountType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="disabled-radio-2" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer">Loan</label>
                </div>
              </div>
              <div>
                <label htmlFor="initialBalance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Initial Balance</label>
                <input onChange={onChangeInput} value={initialBalance} type="number" name="initialBalance" id="initialBalance" placeholder="0000" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                <input onChange={onChangeInput} value={notes} type="text" name="notes" id="notes" placeholder="#travel..." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateAccount