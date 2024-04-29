
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { Link, useLocation} from "react-router-dom"
import {resetPassword} from '../apis/forgotPassword'
export default function UpdatePassword() {
    const location = useLocation()
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
      })
      const [showPassword, setShowPassword] = useState(false)
      const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
      const handleOnSubmit = async (e) => {
        
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        await resetPassword(formData, token)
      }
    
  return (
    <div className="max-w-[500px] p-4 lg:p-8 flex-col mx-auto mt-6">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 text-black text-center">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-500 text-1xl font-normal">
            Almost done. Enter your new password and youre all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            <label className="relative   flex flex-col gap-2">
              <p className="mb-1  leading-[1.375rem] text-1xl text-black font-normal">
                New Password <sup className="text-red">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full rounded border-2 border-grey h-10 py-auto pl-3 text-lg text-richblack-500 font-normal outline-none"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative mt-3  flex flex-col gap-2">
              <p className="mb-1  leading-[1.375rem] text-1xl text-black font-normal">
                Confirm New Password <sup className="text-red">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style w-full rounded border-2 border-grey h-10 py-auto pl-3 text-lg text-richblack-500 font-normal outline-none"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className=" h-11 w-48 mt-4 bg-red rounded text-xl font-medium text-white"
            >
              Reset Password
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
