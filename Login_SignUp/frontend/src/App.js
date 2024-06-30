import { Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/DashBoard';
import Forgot from './Pages/Forgot';
import Otp from './Pages/Otp';
import Newpassword from './Pages/Newpassword';
import { useState } from 'react';

function App() {

  const [isLoggedIn,setLoggedIn]=useState(false);
  
  return (
    <div className="App">
      
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
       <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn}/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/forgot" element={<Forgot/>}/>
       <Route path="/otp1" element={<Otp/>}/>
       <Route path="/newpas" element={<Newpassword />}/>
      </Routes>
    </div>
  );
}

export default App;
