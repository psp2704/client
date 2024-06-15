import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { TransactionContext } from "../../context/TransactionContext/TransactionContext";

function UpdateTransaction() {

  const transactTypes = ["Income", "Expense"];

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

  const {transactID}  = useParams();

  const navigate = useNavigate();

  const {state, fetchTransaction, updateTransaction} = useContext(TransactionContext);

  const [formdata, setFormdata] = useState({
    transactName: "",
    transactionType : "",
    amount: "",
    category : "",
    account : ""
  });

  useEffect (()=>{
    fetchTransaction(transactID)
  },[transactID] )

  //  Update formdata whenever state changes
   useEffect(() => {
    if (state && state.transaction) {
      setFormdata({
        transactName: state.transaction.transactName || "",
        transactionType: state.transaction.transactionType || "",
        amount: state.transaction.amount || "",
        category: state.transaction.category || "",
        notes: state.transaction.notes || "",
        account: state.transaction.account || ""
      });
    }
  }, [state]);

  const { transactName, transactionType, amount, category, account } = formdata;

  const onChangeInput = (e) => {
    return setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  //handle the submit form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await  updateTransaction(formdata,  transactID);
      navigate(`/account-details/${account}`)
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return (
    <>
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
                <label htmlFor="transactName" autoComplete="off" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction Name</label>
                <input onChange={onChangeInput} value={transactName} type="text" name="transactName" id="transactName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="John Doe" required />
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
                  {transactTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                <input onChange={onChangeInput} value={amount} type="number" name="amount" id="amount" placeholder="0000" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Transaction Type
                </label>
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
                <input onChange={onChangeInput} value={notes} type="text" name="notes" id="notes" placeholder="#travel..." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div> */}
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Transaction</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default UpdateTransaction