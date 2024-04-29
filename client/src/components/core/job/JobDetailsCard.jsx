import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getJobDetails } from '../../../apis/job'
import { useSelector } from 'react-redux';
export default function JobDetailsCard() {
    const {token}=useSelector((state)=>state.auth);
    const jobType={
        "WFH":'work from home',
        "WFO":"work from office",
        "Hybrid":"Hybrid"
    }
   const {jobId}=useParams()
   const [jobDetails,setJobDetails]=useState(undefined);
   const [jobPoster,setJobPoster]=useState(false);
   const fetchJobDetails=async ()=>{
    const result=await getJobDetails(jobId);
    console.log(result.data)
    setJobDetails(result?.data);
    console.log(result?.jobPoster)
    setJobPoster(result?.jobPoster);
   }
   useEffect(()=>{
       fetchJobDetails();
   },[])
  return (
    <div className='flex flex-col w-[100vw] h-[100vh] bg-richwhite-100 overflow-y-scroll '>
        <div className='fixed w-[80vw] ml-[10vw] mt-20 px-4 py-10 bg-white shadow-4xl '>
            <h2 className='text-center text-2xl font-medium'>
            {jobDetails?.title + ' ' + jobType[jobDetails?.locationType]+' job/'+jobDetails?.jobType + " at " + jobDetails?.companyName  }
            </h2>
        </div>
        <div className='mt-60 flex flex-col gap-3 w-[80vw] ml-[10vw] bg-white px-10 py-6 mb-6'>
            <div className='flex gap-4 items-baseline'>
                <p className='text-richgrey-300'>1w ago Full Time</p>
                <img src={jobDetails?.logoUrl} alt='google' className='w-6 h-6'></img>
                <p className='text-richgrey-300'>Google</p>
            </div>   
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                <h2 className='text-3xl font-medium'>{jobDetails?.title}</h2>
                {(token&&jobPoster)&&<button className='w-24 h-8 bg-red rounded-md text-white font-normal text-1xl'>Edit job</button>}
                </div>
                <p className='text-red font-light text-base'>{jobDetails?.location} | India</p>
            </div>
            <div className='flex gap-7'>
             <div className='flex flex-col gap-2'>
                <p className='text-richgrey-300'>Stipend</p>
                <p className='text-richblack-200'>Rs {jobDetails?.salary}/month</p>
             </div>
             <div className='flex flex-col gap-2'>
                <p className='text-richgrey-300'>Duration</p>
                <p className='text-richblack-200'>6 Months</p>
             </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='text-black font-medium text-2xl'>About company</h3>
                <p className='text-richgrey-300 font-normal'>We provide technology-based services to help businesses and organizations achieve their goals. We offer a wide range of services, including software development, system integration, network and security services, cloud computing, and data analytics. Our primary focus is on leveraging technology to streamline business processes, improve productivity, and enhance overall efficiency.</p>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='text-black font-medium text-2xl'>About the  job/internship</h3>
                <p className='text-richgrey-300 font-normal'>{jobDetails?.description}</p>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='text-black font-medium text-2xl'>Skills(s) required</h3>
                <div className='flex gap-3'>
                    {
                        jobDetails?.skills.map((skill)=>{
                            return <div className='px-5 py-1 bg-lightred rounded-sm '>{skill}</div>
                      })
                    }
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='text-black font-medium text-2xl'>Additional Information</h3>
                <p className='text-richgrey-300 font-normal'>Stipend structure: This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 2500 per design).</p>
            </div>
        </div>
    </div>
  )
}
