import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { createJob } from '../../../apis/job';
export default function JobForm() {
  const {token}=useSelector((state)=>state.auth);
  const[jobDataForm,setjobDataForm]=useState({
    companyName:"",
    jobPosition:"",
    salary:"",
    location:"",
    jobDescription:"",
    aboutCompany:""
  })
  const [skills,setSkills]=useState([]);
  const addSkillHandler = (event) => {
     const {value}=event.target;
     if(value!=="skills"&&!skills.includes(value)){
      setSkills([...skills,value]);
      event.target.selectedIndex=0;
     }
  };
  
  const removeSkillHandler = (event) => {
    const newSkills = skills.filter((value) => value !== event.target.value);
    setSkills(newSkills);
  };
  const jobType=useRef();
  const locationType=useRef();
  const companyLogo=useRef();
  const onChangeHandler=(event)=>{
      setjobDataForm({...jobDataForm,[event.target.name]:event.target.value})
  }
  const onSubmitHandler=(event)=>{
    event.preventDefault();
   const job=jobType.current.value;
   const location=locationType.current.value;
   if(job==='jobType'){
    toast.error("Select Job Type");
   }
   else if(location==='locationType'){
    toast.error("Select location Type");
   }else if(skills.length===0){
    toast.error("Select atleast one skills");
   }else{
    createJob(jobDataForm,skills,job,location,companyLogo.current.files[0],token);
    locationType.current.selectedIndex=0 
    jobType.current.selectedIndex=0
    setSkills([]);
    setjobDataForm({
      companyName:"",
      jobPosition:"",
      salary:"",
      location:"",
      jobDescription:"",
      aboutCompany:""
    })
    companyLogo.current.value = ''
   }
   
  }
  console.log(jobDataForm)
  return (
    <div className='w-[60vw] h-[100vh] flex items-center justify-center'>
     <form className='w-[80%] m-auto flex flex-col gap-2' onSubmit={onSubmitHandler}>
        <h2 className='text-black font-medium text-2xl'>Add job description</h2>
      <div className='flex  w-[100%]'>
        <label htmlFor='companyname ' className='text-black text-lg w-[40%]' >Company Name</label>
        <input id='companyname' type='text' className="w-[60%] rounded border-2 border-grey h-7  text-lg text-richblack-500 font-normal outline-none" placeholder='Enter your company name here' onChange={onChangeHandler} name='companyName' value={jobDataForm.companyName} required></input> 
      </div>
      <div className='flex  w-[100%]'>
        <label htmlFor='addlogourl' className='text-black text-lg w-[40%]'  >Add logo URL</label>
        <input type="file" accept="image/*" id="addlogourl" className=" w-[60%] rounded border-2 border-grey h-8  text-lg text-richblack-500 font-normal outline-none" ref={companyLogo} onChange={onChangeHandler} required></input> 
      </div>
      <div className='flex  w-[100%]'>
        <label htmlFor='jobposition' className='text-black text-lg w-[40%]'>Job Position</label>
        <input id="jobposition" className=" w-[60%] rounded border-2 border-grey h-7  text-lg text-richblack-500 font-normal outline-none" placeholder='Enter job position' onChange={onChangeHandler} name='jobPosition' value={jobDataForm.jobPosition} required></input>  
      </div>
      <div className='flex  w-[100%]'>
        <label htmlFor='salary' className='text-black text-lg w-[40%]'>Monthly Salary</label>
        <input id="salary" className="w-[60%] rounded border-2 border-grey h-7  text-lg text-richblack-500 font-normal outline-none" placeholder='Enter Amount in rupees' onChange={onChangeHandler} name='salary' value={jobDataForm.salary} required></input> 
      </div>
      <div className='flex  w-[100%]'>
        <label htmlFor="skills" className='text-black text-lg w-[40%]'>Job Type</label>
        <select id="skills" className='flex outline-none' ref={jobType} required>
              <option value="jobType" disabled selected>Select-Job-Type</option>
              <option value="fullTime">fulltime</option>
              <option value="internship">Internship</option>
        </select>  
      </div>
      <div className='flex  w-[100%]'>
        <label htmlFor='locationType' className='text-black text-lg w-[40%]'>Location</label>
        <input className="w-[60%] rounded border-2 border-grey h-7  text-lg text-richblack-500 font-normal outline-none" placeholder='Enter Location' onChange={onChangeHandler} name='location' value={jobDataForm.location} required></input>   
      </div>
      <div className='flex  w-[100%]'>
        <label htmlFor="locationType" className='text-black text-lg w-[40%]'>Location Type</label>
        <select id="locationType" className='flex outline-none' ref={locationType} required>
              <option value="locationType" disabled selected>Select-location-type</option>
              <option value="WFO">WFO</option>
              <option value="WFH">WFH</option>
              <option value="Hybrid">Hybrid</option>
        </select>  
      </div>
      <div className='flex  w-[100%]'>
        <label className='text-black text-lg w-[40%]'>Job Description</label>
        <textArea className="w-[60%]  rounded border-2 border-grey h-10 max-h-10 min-h-10  text-lg text-richblack-500 font-normal outline-none" placeholder='Type the job description'  name='jobDescription' defaultValue={jobDataForm.jobDescription} onChange={onChangeHandler}></textArea>
      </div>
      <div className='flex  w-[100%]'>
        <label htmlFor='skills' className='text-black text-lg w-[40%]'>Skills</label>  
        <div className='w-[60%] flex flex-col gap-1'>
           <select id="skills" className='flex outline-none' required onClick={addSkillHandler}>
              <option value="skills" disabled selected>Select-Skills</option>
              <option value="html">Html</option>
              <option value="css">Css</option>
              <option value="javscript">Javscript</option>
              <option value="Node js">Node js</option>
              <option value="Express js">Express js</option>
              <option value="Mongo Db">Mongo Db</option>
           </select> 
          <div className=' w-[100%] flex flex-wrap gap-2'>
           {
            skills.map((value)=>(
                <div key={value} className=' flex items-center justify-center'>
                  <p className='bg-lightred text-black  text-center px-2'>{value}</p>
                  <button className=' bg-red text-white cursor-pointer px-1' onClick={removeSkillHandler} value={value}>X</button>
                </div>
           ))
           }
          </div>
        </div>
      </div>
      <div className='flex  w-[100%]'>
        <label className='w-[40%] text-black text-lg '>About Company</label>
        <textArea className="w-[60%]  rounded border-2 border-grey h-10 max-h-10 min-h-10  text-lg text-richblack-500 font-normal outline-none" placeholder='Type about your company'  required name='aboutCompany' value={jobDataForm.aboutCompany} onChange={onChangeHandler}></textArea>
      </div>
      <div className='flex justify-end gap-3'>
            <Link to="/">
             <button className='w-24 h-8  rounded-md border-2 border-richgrey-200 font-medium text-1xl text-grey'>Cancel</button>
            </Link>
            <button className="w-24 h-8 bg-red rounded-md text-white font-medium text-1xl" type='submit'>+ Add Job</button>
      </div>
     </form>
    </div>
  )
}
