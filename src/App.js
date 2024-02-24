import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes , Route } from 'react-router-dom';
import Register from './components/Forms/Register';
import Login from './components/Forms/Login';
import Navbar from './components/Navbar/Navbar';
import Counter from './components/Forms/Counter';
import HomePage from './components/HomePage/HomePage';
import Profile from './components/Profile/Profile';
import AccountSummary from './components/Dashbaord/AccountSummary';
import AccountDashboard from './components/Dashbaord/AccountDashboard';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/counter" element={<Counter />}></Route>
            <Route path="/dashboard" element={<AccountDashboard />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
