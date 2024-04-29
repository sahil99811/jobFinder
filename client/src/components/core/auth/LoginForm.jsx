import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import {login} from '../../../apis/auth'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  function onChangeHandler(event){
     setFormData({
      ...formData,
      [event.target.name]:event.target.value
     })
  }
  function onSubmitHandler(event) {
    event.preventDefault();
    login(formData.email, formData.password, navigate,dispatch);
  }
  
  return (
    <form className='flex flex-col gap-4' onSubmit={onSubmitHandler}>
      <input
        type='text'
        placeholder='Email'
        className='rounded border-2 border-grey h-10 py-auto pl-3 text-lg text-richblack-500 font-normal outline-none'
        required
        name='email'
        value={formData.email}
        onChange={onChangeHandler}
      />
      <input
        type='text'
        placeholder='Password'
        className='rounded border-2 border-grey w-full h-10 py-auto pl-3 text-lg text-richblack-500 font-normal outline-none'
        required
        name='password'
        value={formData.password}
        onChange={onChangeHandler}
      />
      <button className='h-11 w-48 mt-4 bg-red rounded text-xl font-medium text-white leading-10' type='submit'>
        Sign in
      </button>
      <div className='flex justify-between'>
       <p className='text-richblack-500 text-base -mt-1'>
        Don't have an account? 
        <Link to="/signup"> 
          <span className='text-black underline font-semibold cursor-pointer'>Sign Up</span>
        </Link>
       </p>
       <Link to="/forgot-password"> 
          <p className='text-red font-medium text-base  underline'>
           Forgot Password  
          </p>
       </Link>
      </div>
    </form>
  );  
}
