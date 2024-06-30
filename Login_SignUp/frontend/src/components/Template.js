import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
const Template = ({title,desc1,desc2,img,formtype,setLoggedIn}) => {

  

  return (
   <div>
      <div>
    <h1>{title}</h1>
   <p>
    <span>
      {desc1}
    </span>
    <span>
      {desc2}
    </span>
   </p>
   {
    (formtype==="signup"?(<SignupForm setLoggedIn={setLoggedIn}/>):(<LoginForm setLoggedIn={setLoggedIn}/>))
   }

   <br></br>
   <br></br>

   {/* <div>
    <div></div>
    <div>OR</div>
    <div></div>
   </div>
   
   <button  >SignUp With Google</button> */}
   
   </div>
   <div>
    <img src={img} alt="Important" width={550} height={500} loading="lazy"/>
   </div>

   </div>
  );
}

export default Template;