import { useEffect, useRef, useState } from 'react';
import searchbar from '../../assets/search.png';
import dropdown from '../../assets/dropdown.png';
import { getJobs } from '../../apis/job';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../../slices/jobSlice';
import { Link } from 'react-router-dom';
export default function JobSearch() {
  const dispatch=useDispatch();
// State variables
const [skills, setSkills] = useState([]); // Array to store selected skills
const [search, setSearch] = useState(""); // State to store search query
const {token}=useSelector((state)=>state.auth);
// Event handler for selecting skills from dropdown
const skillsSelectHandler = (event) => {
   const {value}=event.target;
     if(value!=="Skills"&&!skills.includes(value)){
      setSkills([...skills,value]);
     }
     event.target.selectedIndex=0;
};

// Event handler for removing selected skills
const removeSkillsHandler = (event) => {
  const newSkills = skills.filter((value) => value !== event.target.value);
  setSkills(newSkills);
};

// Function to apply filters
const applyFilterHandler = async () => {
  fetchJobs();
  
};

// Event handler for input change (search)
const onChangeHandler = (event) => {
  const value = event.target.value;
  setSearch(value);
};

// Function to fetch jobs based on search query
const fetchJobs = async () => {
  const data = await getJobs(search,skills);
  dispatch(setJobs(data.jobs));

};

// useEffect hook to trigger job search after a delay when search query changes
useEffect(() => {
  const timerId = setTimeout(() => {
    fetchJobs();
  }, 1000);
  return () => {
    clearTimeout(timerId);
  };
}, [search]);


  return (
    <div className='w-[80vw] bg-white shadow-3xl'>
      <div className='m-auto flex flex-col gap-6 py-6'>
        {/* Search bar */}
        <div className='flex w-[90%] mx-auto h-10 items-center justify-center gap-4 rounded-md border-2 border-lightgrey'>
          <img src={searchbar} alt="search" className='h-7 w-7 ml-6'/>
          <input placeholder='Type any job title' className='outline-none w-[100%] h-full text-lg text-richblack-500 font-normal' value={search} onChange={onChangeHandler}/>
        </div>

        {/* Skills selection */}
        <div className="flex w-[90%] mx-auto justify-between items-baseline">
          <div className='flex items-baseline gap-4'>
            <select id="skills" className='flex' onClick={skillsSelectHandler}  >
              <option value="Skills" disabled selected>Skills<img src={dropdown} alt='dropdown'/></option>
              <option value="Html">Html</option>
              <option value="Css">Css</option>
              <option value="Js">Js</option>
              <option value="Node Js">Node Js</option>
              <option value="React Js">React Js</option>
              <option value="Mongo Db">Mongo Db</option>
            </select>
            {/* Display selected skills */}
            <div className='flex flex-wrap gap-2'>
              {skills.map((val) => (
                <div key={val} className=' flex items-center justify-center'>
                  <p className='bg-lightred text-black px-2 text-center'>{val}</p>
                  <button className=' bg-red text-white cursor-pointer px-1' onClick={removeSkillsHandler} value={val}>X</button>
                </div>
              ))}
            </div>
          </div>
          {/* Buttons for applying filters and clearing selected skills */}
          {
            token==null? <div className='flex gap-5 mr-4'>
            <button className='w-28 h-7 bg-red rounded-sm text-white font-medium text-1xl' onClick={applyFilterHandler}>Apply filter</button>
            <button className='text-1xl text-red font-normal' onClick={() => setSkills([])}>Clear</button>
            </div>:<div className='flex  mr-4'><Link to="/createjob"><button className='w-28 h-7 bg-red rounded-sm text-white font-medium text-1xl' >+ Add Job</button></Link></div>
          }
        </div>
      </div>
    </div>
  );
}
