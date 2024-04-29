import React, { useState } from 'react';
import { signup } from '../../../apis/auth';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
export default function SignupForm() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignupFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await signup(signupFormData, navigate,dispatch);
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={onSubmitHandler}>
      <input 
        type='text' 
        placeholder='Name' 
        className='rounded border-2 border-grey Bw-full h-11 py-auto pl-3 text-lg text-richblack-500 font-normal outline-none'  
        name='name' 
        value={signupFormData.name} 
        onChange={onChangeHandler} 
        required 
      />
      <input 
        type='text' 
        placeholder='Email' 
        className='rounded border-2 border-grey Bw-full h-11 py-auto pl-3 text-lg text-richblack-500 font-normal outline-none'  
        name='email' 
        value={signupFormData.email} 
        onChange={onChangeHandler} 
        required 
      />
      <input 
        type='text' 
        placeholder='Mobile' 
        className='rounded border-2 border-grey Bw-full h-11 py-auto pl-3 text-lg text-richblack-500 font-normal outline-none'  
        name='mobile' 
        value={signupFormData.mobile} 
        onChange={onChangeHandler} 
        required 
      />
      <input 
        type='text' 
        placeholder='Password' 
        className='rounded border-2 border-grey Bw-full h-11 py-auto pl-3 text-lg text-richblack-500 font-normal outline-none'  
        name='password' 
        value={signupFormData.password} 
        onChange={onChangeHandler} 
        required 
      />
      <div className='flex items-baseline gap-3'>
        <input 
          type='checkbox' 
          placeholder='Password' 
          className=''
          id='checkbox' 
        />
        <label htmlFor='checkbox' className=''>
          By creating an account, I agree to our terms of use and privacy policy
        </label>
      </div>
      <button 
        className='h-11 w-48 bg-red rounded text-xl font-medium text-white leading-10' 
        type='submit'
      >
        Create Account
      </button>
      <p className='text-richblack-500 text-base -mt-1' >
        Already have an account?  
        <Link to="/login">
          <span className='text-black underline font-semibold cursor-pointer'>Sign In</span>
        </Link>
      </p>
    </form>
  );
}
