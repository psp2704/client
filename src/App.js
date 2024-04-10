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
import CreateAccount from './components/Forms/Account/CreateAccount';
import UpdateAccount from './components/Forms/Account/UpdateAccount';

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
            <Route path="/create-account" element={<CreateAccount />}/>
            <Route path="/update-account/:accountID" element={<UpdateAccount />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
