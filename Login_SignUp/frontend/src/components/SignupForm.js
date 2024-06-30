import React, { useState } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { useEffect } from "react";
const SignupForm = ({setLoggedIn})=>
{
console.log("ha")
const navigate=useNavigate();
const [form,setform]=useState({firstName:"",
lastName:"",
email:"",
password:"",
confirmPassword:""
})
const[showPassword,setPassword]=useState(false);
const[showPassword1,setPassword1]=useState(false);
const [showsymbol,setsymbol]=useState(false);
const [showsymbol1,setsymbol1]=useState(false);
const [showsymbol2,setsymbol2]=useState(false);
const [showsymbol3,setsymbol3]=useState(false);

const [countries, setCountries] = useState([]);


useEffect(() => {
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(sortedCountries);
    })
    .catch(error => console.error('Error fetching country data:', error));
}, []);

function changeHandler(event)
{
  event.preventDefault();
  setform((prev)=>(
    {
      ...prev,
      [event.target.name]:event.target.value
    }
  ))
  if(event.target.name==='password')
    {
      const password=event.target.value;
    
      
        let flag1=false,flag2=false,flag3=false,flag=false;
        if(password.length>=8)
          {
            flag=true;
          }
        for(let i=0;i<password.length;i++)
          {
            if(password[i]>='0' && password[i]<='9')
              {
           
                flag1=true;
              }
              else if(password[i]>='A' && password[i]<='Z')
                {
                  flag2=true;
                }
                else if(password[i]=='@' || password[i]=='$' || password[i]=='#')
                  {
                    flag3=true;
                  }
          }
          setsymbol(flag);
          setsymbol1(flag1);
          
          setsymbol2(flag2);
          setsymbol3(flag3);
    }

}

// const endpoint = `http://127.0.0.1:8000/person/`;
const endpoint = `/person/`;
// Django endpoint http://localhost:8080
async function postdata() {
  const { firstName, lastName, email, password } = form;
  const data = { firstName, lastName, email, password };
  try {
    const response = await axios.post(endpoint, data);
    if (response.data.status === "unsuccessful") {
      toast.error(response.data.message);
      // setLoggedIn(true); // Update state to reflect logged-in status
      // navigate("/dashboard"); // Redirect to dashboard
    } else {
      console.log("Ab aayega")
      toast.success("Account Created");
        navigate("/dashboard",{status:{username}})
  } 
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
}

async function submitHandler(event)
{
  console.log("No");
  event.preventDefault();
  if(showsymbol && showsymbol1 && showsymbol2 && showsymbol3)
    {
      console.log("ha");
      if(form.password!=form.confirmPassword)
        {
          toast.error("Passwords do not match");
          return ;
        }
        console.log("ha");
        setLoggedIn(true);
        console.log("ha");
        await postdata();
        console.log("na");
        toast.success("Account Created");
        navigate("/dashboard")
    }
    else
    {
      toast.error("Conditions for password does not match");
          return ;
    }
 
}

return (
<div>

   <form onSubmit={submitHandler}>
    <div>
      <label>
        <p>First Name <sup>*</sup></p>
        <input 
        required
        type="text"
        name="firstName"
        placeholder="Enter first name here"
        value={form.firstName}
        onChange={changeHandler}/>
      </label>

  <label>
    <p>Last Name <sup>*</sup></p>
    <input 
    required
    type="text"
    name="lastName"
    placeholder="Enter last name here"
    value={form.lastName}
    onChange={changeHandler}/>
  </label>
  </div>
<label>
<p>Country </p>
<select 
            required
            name="country"
            value={form.country}
            onChange={changeHandler}
          >
            <option className="J" value="" disabled>Select a country</option>
            {countries.map(country => (
              <option key={country.cca2} value={country.cca2}>
                {country.name.common}
              </option>
            ))}
          </select>
</label>

{/* </div> */}
 

<label>
    <p>Email Address </p>
    <input 
    required
    type="email"
    name="email"
    placeholder="Enter email address here"
    value={form.email}
    onChange={changeHandler}/>
  </label>
  <div className="Ut1">
  <label>
    <p>Security Question</p>
    <select id="gender" name="select" value={form.select} onChange={changeHandler}>
        <option value="What is your favourite place to visit?">What is your favourite place to visit?</option>
        <option value="What is your favourite color?">What is your favourite color?</option>
        <option value="What was the name of your school?">What was the name of your school?</option>
      </select>
  </label>

  <label>
    <p>Answer to Security Question </p>
    <input 
    required
    type="text"
    name="ans"
    
    value={form.ans}
    onChange={changeHandler}/>
  </label>

  </div>
  

  <div className="Ut1">
  <label>
    <p>Create Password <sup>*</sup></p>
    <input 
    required
    type= {showPassword?("text"):("password")}
    name="password"
    placeholder="Enter Password here"
    value={form.password}
    onChange={changeHandler}/>
    <span onClick={()=>setPassword((prev)=> !prev)}>
        {showPassword?(<AiOutlineEye/>):(<AiOutlineEyeInvisible/>)}
      </span>
  </label>
  <label>
    <p>Confirm Password <sup>*</sup></p>
    <input 
    required
    type= {showPassword1?("text"):("password")}
    name="confirmPassword"
    placeholder="Confirm Password "
    value={form.confirmPassword}
    onChange={changeHandler}/>
    <span onClick={()=>setPassword1((prev)=> !prev)}>
        {showPassword1?(<AiOutlineEye/>):(<AiOutlineEyeInvisible/>)}
      </span>
  </label>
  </div>
  <br />
  <br />
 
  <div className="Ut1">
    <div className="At">
    <p>
      {
        !showsymbol?(<RxCross1 />):(<TiTick />)
      }
    </p>
    <p>
      {
        !showsymbol1?(<RxCross1 />):(<TiTick />)
      }
    </p>
    <p>
      {
        !showsymbol2?(<RxCross1 />):(<TiTick />)
      }
    </p>
    <p>
      {
        !showsymbol3?(<RxCross1 />):(<TiTick />)
      }
    </p>
    </div>
    <div className="A">
    <span>Password length more than 8</span>
    <span>Presence of a Digit</span>
    <span>Presence of Uppercase Character</span>
    <span>Presence of Special Character</span>
    </div>
  </div>

  <button>Create Account</button>
   </form>
    </div>
);
}

export default SignupForm;