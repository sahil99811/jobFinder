import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import image from '../../../assets/image 466.png'
export default function Template({title,description,formtype}) {
  return (
    <div className='flex'>
        <div className='w-[40vw] m-auto flex flex-col gap-6'>
          <div className=' flex flex-col gap-1'>
           <h2 className='text-black text-2xl font-semibold'>{title}</h2>
           <p className='text-richblack-500 text-1xl font-normal'>{description}</p>
          </div>
          {formtype==='login'?<LoginForm/>:<SignupForm/>}
        </div>
        <div className='w-[40vw] h-[100vh] relative '>
          <h2 className='absolute top-6 text-white text-2xl text-center w-full'>Your Personal Job Finder</h2>
          <img src={image} alt={formtype+" image"} style={{ height: '100%', width: '100%' }} ></img>
        </div>
    </div>
  )
}
