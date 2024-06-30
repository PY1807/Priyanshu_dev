import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
const LoginForm = ({setLoggedIn})=> {

 
    const navigate=useNavigate();
    const[form,setform]=useState({email:"",password:""})
    const[showPassword,setPassword]=useState(false)
    function changeHandler(event)
    {
      setform((prevdata)=> (
        {...prevdata,
          [event.target.name]:event.target.value}
      ))
    }
     
    // const endpoint = `http://127.0.0.1:8000/log/`;
     // Django endpoint
    const endpoint=`/log/`
async function postdata() {
  const { email, password } = form;
  const data = { email, password };
  try {
    const response = await axios.post(endpoint, data);

    if (response.data.status === "success") {
      toast.success(response.data.message);
      setLoggedIn(true); // Update state to reflect logged-in status
<<<<<<< HEAD
      const username=user;
      navigate("/dashboard",{state:{username}}); // Redirect to dashboard
=======
      navigate("/dashboard"); // Redirect to dashboard
>>>>>>> c733b9e (Added)
    } else {
      console.log("Ab aayega")
      toast.error(response.data.message);
  } 
}
  catch (error) {
    console.error("Cannot Logi", error);
    throw error;
  }
}

    async function submitHandler(event)
    {
      console.log("Ha2")
      console.log(typeof(setLoggedIn))
      event.preventDefault();
      console.log("Yes");
        // setLoggedIn(true);
        await postdata();
        // toast.success("Logged In !!!");
        // navigate("/dashboard")
    }

    return (
     <div>
      <form onSubmit={submitHandler}>
        <label>
          <p>Email Address</p>
          <span><sup>*</sup></span>
          <input required 
          type="email"
          value={form.email}
          onChange={changeHandler}
          name="email"
          placeholder="Enter your email id here"
          />
        </label>

        <label>
          <p>Password</p>
          <span><sup>*</sup></span>
          <input required 
          type={showPassword?"text":"password"}
          value={form.password}
          onChange={changeHandler}
          name="password"
          placeholder="Enter your password here"
          />
          <span onClick={()=>setPassword((prev)=> !prev)}>
            {showPassword?(<AiOutlineEye/>):(<AiOutlineEyeInvisible/>)}
          </span>
        </label>
        
        <br />
        <br />
        
        <p onClick={()=> navigate("/forgot")}>
          Forgot Password?
        </p>
       <button>Sign Up</button>
         
      </form>
     </div>
    );
  }

export default LoginForm;