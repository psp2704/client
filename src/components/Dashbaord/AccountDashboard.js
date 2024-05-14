import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";

const AccountDashboard = () => {
  const {  getProfile, profile, error } = useContext(AuthContext);

  //dispatch action
  useEffect(() => {
    getProfile();
  }, []);

  const totalBalance = profile?.userData?.accounts.reduce((acc, account)=>{
    return acc + account?.initialBalance;
  }, 0)

  const allAccountExpense = profile?.userData?.accounts.reduce((acc, account)=>{
    // let expense = account?.transactionData?.reduce((acc1, transaction) => {
    //   // Check if the transaction type is "Income"
    //   if (transaction?.transactionType === 'Expense') {
    //     // If it's an income transaction, add its amount to the accumulator
    //     return acc1 + transaction?.amount;
    //   } else {
    //     // Otherwise, return the accumulator unchanged
    //     return acc1;
    //   }
    // }, 0);
    let expense = account?.transactionData?.reduce((acc1, transaction) => {
        // Check if the transaction type is "Income"
        if (transaction?.transactionType === 'Expense') {
          // If it's an income transaction, add its amount to the accumulator
          return acc1 + transaction?.amount;
        } else {
          // Otherwise, return the accumulator unchanged
          return acc1;
        }
      }, 0);
    return expense
  }, 0)

  // console.log(allAccountExpense);
  let result = profile?.userData.accounts.reduce((prev, account)=>{
    
  })
  console.log(result)
   
  return (
    <>
      {error ? (
        <>
          <div
            className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong> {""}
            <span className="block sm:inline ">{error}</span>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-200">
            <AccountSummary accountBalance = {totalBalance }/>
            <AccountList accounts={profile?.userData?.accounts} />
          </div>
        </>
      )}
    </>
  );
};

export default AccountDashboard;
