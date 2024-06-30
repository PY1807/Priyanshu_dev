import React from "react";
import Template from "../components/Template";
import logo from "../logo.svg"
const Login = ({setLoggedIn}) => {
  
  
  return (
   <Template 
   title="Welcome Back"
   desc1="Build skills for today,tomorrow, and beyond."
   desc2="Education to future-proof your career"
   img={logo}
   formtype="login"
   setLoggedIn={setLoggedIn}
   />
  
  );
}
export default Login;