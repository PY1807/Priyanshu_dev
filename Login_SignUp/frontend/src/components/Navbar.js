import React from "react";
import logo from "../logo.svg"
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Navbar = (props) => {
  const isLoggedIn=props.isLoggedIn;
  const setLoggedIn=props.setLoggedIn;
  const navigate=useNavigate();
  return (

    

    <div className="Nav">
  
    <Link to="/">
    <img src={logo} alt="image"  width={160} height={70} loading="lazy"/>

    </Link>

    <nav>
      <ol className="Ele" >
        <li>
          <Link to="/">
          Home
          </Link>
          
        </li>
        <li>
        <Link to="/">
          About
          </Link>
        </li>
        <li>
        <Link to="/">
          Contact
          </Link>
        </li>
      </ol>

    </nav>
    <div className="Buttons">
      {
        !isLoggedIn &&
        <Link to="/login">
          <button>
            Login
          </button>
        </Link>
      }
      {
        !isLoggedIn &&
        <Link to="/signup">
          <button >
            Signup
          </button>
        </Link>
      }
      {
        isLoggedIn &&
        <Link to="/">
          <button onClick={()=>{
            setLoggedIn(false);
            toast.success("Logged Out!!");
            navigate("/");
          }}>
            Logout
          </button>
        </Link>
      }
      {
        isLoggedIn &&
        <Link to="/dashboard">
          <button>
            DashBoard
          </button>
        </Link>
      }
    </div>
  </div>
  );
  
}

export default Navbar