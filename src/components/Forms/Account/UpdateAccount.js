import React, { useContext, useEffect, useState, } from 'react'
import { AccountContext } from '../../context/AccountContext/AccountContext';
import { useNavigate, useParams } from 'react-router-dom'

function UpdateAccount() {

  const { state, account, getSingleAccount , updateAccount } = useContext(AccountContext);

  const { accountID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleAccount(accountID);
  }, [accountID]);

  const [formdata, setFormdata] = useState({
    accountName: '',
    initialBalance: '',
    notes: '',
    accountType: '', // Add accountType to form data state
  });

  const accountTypes = [
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

  // Update formdata whenever state changes
  useEffect(() => {
    if (state && state.account) {
      setFormdata({
        accountName: state.account.accountName || "",
        initialBalance: state.account.initialBalance || "",
        notes: state.account.notes || "",
        accountType: state.account.accountType || ""
      });
    }
  }, [state]);

  const onChangeInput = (e) => {
    // console.log(e.target.name, e.target.value);
    return setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  //handle the submit form 
  const handleSubmit = (e) => {
    e.preventDefault();
    updateAccount(formdata, accountID, navigate);
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
            <form className="space-y-4 md:space-y-6"
             onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="accountName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Name</label>
                <input onChange={onChangeInput} value={formdata.accountName} type="text" name="accountName" id="accountName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="John Doe" required="" />
              </div>
              <div>
                <label
                  htmlFor="accountType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Account Type
                </label>
                <select
                  onChange={onChangeInput}
                  value={formdata.accountType}
                  name="accountType"
                  id="accountType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                >
                  <option value="">Select Account Type</option>
                  {accountTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="initialBalance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Initial Balance</label>
                <input onChange={onChangeInput} value={formdata.initialBalance} type="number" name="initialBalance" id="initialBalance" placeholder="0000" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                <input onChange={onChangeInput} value={formdata.notes} type="text" name="notes" id="notes" placeholder="#travel..." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Account</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpdateAccount