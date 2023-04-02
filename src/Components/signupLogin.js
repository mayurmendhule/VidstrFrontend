import Registration from "./signup";
import Login from "./login";
import { useState } from "react";
const SigninSignup=()=>{
    const [isLogedin,setisLogedin]=useState(false)
    return(
        <div className="container">
            <div className='div1'>
               <div className='title'>
               <p className='p1'>Tuner</p>
               <p className='p2'>Enjoy Multiple videos</p>
               <p className='p3'>at one place</p>
               </div>
               <div className='buttons'>
                {isLogedin?<button onClick={()=>{setisLogedin(false)}}>Register</button>:<button onClick={()=>{setisLogedin(true)}}>Login</button>}
                
               </div>
            </div>
            <div className='div2'>
                {isLogedin===false?<Registration/> : <Login/>}
            </div>

        </div>
    )
}
export default SigninSignup;
