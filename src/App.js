import './App.css';
import {BrowserRouter, Routes , Route } from 'react-router-dom';
import Register from './components/Forms/Register';
import Login from './components/Forms/Login';
import Navbar from './components/Navbar/Navbar';
import Counter from './components/Forms/Counter';
import HomePage from './components/HomePage/HomePage';
import Profile from './components/Profile/Profile';
import AccountDashboard from './components/Dashbaord/AccountDashboard';
import AccountDetails from './components/Dashbaord/AccountDetails';
import CreateAccountForm from './components/Forms/Account/CreateAccountForm';
import UpdateAccount from './components/Forms/Account/UpdateAccount';
import CreateTransaction from './components/Forms/Transaction/CreateTransaction';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/counter" element={<Counter />}/>
            <Route path="/dashboard" element={<AccountDashboard />}/>
            <Route path="/account-details/:accountID" element={<AccountDetails />}/>
            <Route path="/create-account" element={<CreateAccountForm />}/>
            <Route path="/update-account/:accountID" element={<UpdateAccount />}/>
            <Route path="/create-transaction/:accountID" element={<CreateTransaction/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
