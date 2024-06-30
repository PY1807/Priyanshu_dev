import React from "react";
import Template from "../components/Template";
import logo from "../logo.svg"
const Signup = ({setLoggedIn}) => {
  return (
    <Template
    title="Join the millions learning to code with us"
   desc1="Build skills for today,tomorrow, and beyond."
   desc2="Education to future-proof your career"
   img={logo}
   formtype="signup"
   setLoggedIn={setLoggedIn}
    />
  );
}
export default Signup;