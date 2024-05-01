import React from 'react'
import JobForm from '../components/core/job/JobForm'
import image from '../assets/WallpaperDog-20567151 1.png'
export default function Editjob() {
  return (
    <div className='flex w-[100vw]'>
      <JobForm></JobForm>
      <div className='w-[40vw] h-[100vh] relative'>
           <h2 className=' fixed  text-white text-2xl font-normal mt-6 w-[40%]  text-center'>Recruiter add job details here</h2>
           <img src={image} alt='logo' className='w-full h-full'></img>
      </div>
    </div>
  )
}
