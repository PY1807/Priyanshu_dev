import React, { useState } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Forgot = () => {

  console.log("YEs Yes Yes");
  
  const[showPassword,setPassword]=useState(false)
  const [email,setemail]=useState("");
  const [password,setpass]=useState("");
  const [pass,showpass]=useState(false);
  const navigate=useNavigate();
  // const endpoint = `http://127.0.0.1:8000/otp/`; // Django endpoint http://localhost:8080
  const endpoint = `/otp/`;
async function postdata() {
  console.log("aa gaye post data ke andar")
  toast.success('Start')
  const data = {email};
  try {
    const response = await axios.post(endpoint, data);
    console.log(response.data.status)
    if (response.data.status === "success") {
      console.log("success")
      showpass(true) 
      toast.success('Otp sent')
      const otp_to_check=response.data.otp_to_check
      navigate("/otp1",{ state: { email,otp_to_check}})// Redirect to dashboard
    } else {
      console.log("Ab aayega")
      toast.error('Otp not sent')
      // toast.error(response.data.message);
  } 
}
  catch (error) {
    toast.error('Otp not there')
    console.error("Cannot Login", error);
    throw error;
  }
  
}
  async function submitHandler(event)
  {

    event.preventDefault();
  console.log("Ha")
  
  await postdata();

  }
  
  function changeHandler1(event)
  {
    console.log("Email a agaya")
    setemail(event.target.value);
  }
  function changeHandler2(event)
  {
    setpass(event.target.value);
  }

  return (
    <div>
      {!pass && <form onSubmit={submitHandler}>
        <label>
          <p>Email Address</p>
          <span><sup>*</sup></span>
          <input required 
          type="email"
          value={email}
          onChange={changeHandler1}
          name="email"
          placeholder="Enter your email id here"
          />
        </label>

       

       <button>Send OTP</button>
      </form>}

      {
        pass && <form>
          <label>
          <p>Password</p>
          <span><sup>*</sup></span>
          <input required 
          type={showPassword?"text":"password"}
          value={password}
          onChange={changeHandler2}
          name="password"
          placeholder="Enter your password here"
          />
          <span onClick={()=>setPassword((prev)=> !prev)}>
            {showPassword?(<AiOutlineEye/>):(<AiOutlineEyeInvisible/>)}
          </span>
        </label>
        
        <br />
        <br />

        </form>
      }
    </div>
  );
}
export default Forgot;