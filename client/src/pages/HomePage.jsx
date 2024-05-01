import React, { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import JobSearch from '../components/common/JobSearch'
import JobCard from '../components/core/job/JobCard'
import { useSelector } from 'react-redux'
export default function HomePage() {
  const {jobs}=useSelector((state)=>state.job);
  return (
         <div className='h-[100vh] w-[100vw] relative overflow-x-hidden'>
           <Navbar></Navbar>
           <div className='w-[100vw]  mb-4 mt-28 ml-[10vw]  '>
           <JobSearch></JobSearch>
           {
            jobs?.map((job)=>{
              return <JobCard key={jobs._id} jobData={job} ></JobCard>
            })
           }
          </div>
         </div>
  )
}
