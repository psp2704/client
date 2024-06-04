import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import Loading from "../../utils/Loading";

const AccountDashboard = () => {
  const {  getProfile, profile, error} = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  // dispatch action
  useEffect(() => {
    getProfile();
    setTimeout(()=>{
      setIsLoading(false)
    }, 300)
  }, []);

  const totalBalance = profile?.reduce((acc, account)=>{
    return acc + account?.initialBalance;
  }, 0)

  return (
    <>
    {isLoading ? <Loading /> : 
    (error ? (
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
            <AccountList accounts={profile} />
          </div>
        </>
      )) }

{/* 
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
            <AccountList accounts={profile} />
          </div>
        </>
      )} */}
      
    </>
  );
};

export default AccountDashboard;
