import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setToken } from '../../slices/authSlice';
import toast from 'react-hot-toast';
export default function Navbar() {
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);
  const logoutHandler=()=>{
    localStorage.clear();
    dispatch(setToken(null))
    toast.success('Logout succesfully');
  }
  return (
    <nav className='fixed top-0 left-0 bg-red w-full h-24 rounded-b-[40px] flex justify-between items-center pl-14 pr-14  '>
        <h2 className='text-2xl text-white font-medium'>Jobfinder</h2>
          {
            token===null?<div className='flex gap-4'>
                   <Link to='/login'>
                    <button className='h-9 w-24 bg-red rounded-md border-2 border-white font-medium text-1xl text-white'>Login</button>
                   </Link>
                   <Link to='/signup'>
                    <button className='h-9 w-24 bg-red rounded-md border-2 border-white font-medium text-1xl text-white'>Register</button>
                   </Link>
                  </div>:<div className='flex gap-4'>
                    <button className='font-medium text-1xl text-white' onClick={logoutHandler}>Logout</button>
                    <p className='font-medium text-1xl text-white'>Hello! Recruiter</p>
                  </div>
          }
    </nav>
  )
}
