import React from 'react'
import image from '../../../assets/image 461.png'
import flag from '../../../assets/emojione-v1_flag-for-india.png'
import { Link} from 'react-router-dom';
export default function JobCard({jobData}) {

  return (
    <div className='w-[80vw]  shadow-3xl mt-4 flex justify-between px-6 py-4 gap-3 '>
      <div className='flex gap-4 '>
        <img src={jobData?.logoUrl} alt='componglogo' className='w-14 h-14'></img>
        <div className='flex flex-col gap-1'>
         <p className='text-lg text-black font-normal '>{jobData.title}</p> 
         <div className='flex gap-4'>
            <p className='text-richgrey-200 font-medium'>11-50</p>
            <p className='text-richgrey-200 font-medium'>{jobData.salary}</p>
         </div>
         <div className='flex gap-4'>
            <p className='text-red font-normal text-base'>{jobData.locationType}</p>
            <p className='text-red font-normal text-base'>{jobData.jobType}</p>
         </div>
        </div>
        <div className='flex justify-center items-center gap-2 '>
         <img src={flag} alt="flag" className='w-6'></img>
         <p className='text-base text-richgrey-200 font-medium'>{jobData.location}</p>
        </div>
      </div>
      <div >
       <div className='flex gap-3 rounded-sm flex-wrap'>
        {
          jobData.skills?.map((val)=>{
            return <div className='w-24 h-6 bg-lightred rounded-sm flex items-center justify-center'>
             <p className='font-medium text-xs '>{val}</p>
            </div>
          })
        }
       </div>
       <Link to={`/job/${jobData._id}`}>
        <button className='w-28 h-7 bg-red rounded-sm text-white font-medium text-1xl float-end mt-3'>View details</button>
       </Link>
        
      </div>
    </div>
  )
}
