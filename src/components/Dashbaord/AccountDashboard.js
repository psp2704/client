import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";

const AccountDashboard = () => {
  const { getProfile, profile, error } = useContext(AuthContext);

  //dispatch action
  useEffect(() => {
    getProfile();
  }, []);
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
          <AccountSummary />
          <AccountList accounts={profile?.userData?.accounts} />
          </div>
        </>
      )}
    </>
  );
};

export default AccountDashboard;
