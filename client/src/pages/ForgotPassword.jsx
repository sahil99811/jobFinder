import { useState } from "react"
import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import { resetPasswordToken } from "../apis/forgotPassword"
import { useNavigate } from "react-router-dom"
export default function ForgotPassword(){
    const [email, setEmail] = useState("")
    const navigate=useNavigate();
    const [emailSent, setEmailSent] = useState(false)
    const handleOnSubmit = (e) => {
        e.preventDefault()
        resetPasswordToken(email,setEmailSent,navigate);
      }
    return(
        <div className="max-w-[500px] p-4 lg:p-8 flex flex-col mx-auto mt-6">
         <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-black text-center">
          {!emailSent ? "Reset your password" : "Check email"}
         </h1>
         <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-500 text-1xl font-normal ">
          {!emailSent
            ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`}
         </p>
         <form onSubmit={handleOnSubmit}>
          {!emailSent && (
            <label className="w-full">
              <p className="mb-1  leading-[1.375rem] text-1xl text-black font-normal">
                Email Address <sup className="">*</sup>
              </p>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="form-style w-full rounded border-2 border-grey h-10 py-auto pl-3 text-lg text-richblack-500 font-normal outline-none"
              />
            </label>
          )}

           <button
            type="submit"
            className=" h-11 w-48 mt-4 bg-red rounded text-xl font-medium text-white"
           >
            {!emailSent ? "Sumbit" : "Resend Email"}
           </button>

         </form>
         <div className="mt-6 flex items-center justify-between">
          <Link to="/login">
            <p className="flex items-center gap-x-2 ">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
         </div>
      </div>  
    )
}