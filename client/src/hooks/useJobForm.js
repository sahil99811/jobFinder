import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createJob, updateJob } from '../apis/job';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useJobForm = (jobdata, edited, companyLogo) => {
  const { token } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  // Initialize jobDataForm state with default values or jobdata values
  const [jobDataForm, setJobDataForm] = useState({
    companyName: jobdata?.companyName || '',
    jobPosition: jobdata?.title || '',
    salary: jobdata?.salary || '',
    location: jobdata?.location || '',
    jobDescription: jobdata?.description || '',
    aboutCompany: jobdata?.aboutCompany || '',
    jobType: jobdata?.jobType || 'jobType',
    locationType: jobdata?.locationType || 'locationType',
    skills: jobdata?.skills || [],
  });

  // Handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setJobDataForm((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add a skill
  const addSkillHandler = (event) => {
    const { value } = event.target;
    if (value !== 'skills' && !jobDataForm.skills.includes(value)) {
      setJobDataForm((prevData) => ({ ...prevData, skills: [...prevData.skills, value] }));
    }
    event.target.selectedIndex = 0;
  };

  // Remove a skill
  const removeSkillHandler = (event) => {
    const skillToRemove = event.target.value;
    setJobDataForm((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const requiredFields = ['companyName', 'jobPosition', 'salary', 'jobDescription', 'aboutCompany', 'jobType', 'location'];
    const allFieldsFilled = requiredFields.every((field) => jobDataForm[field]);
    if (!allFieldsFilled || jobDataForm.skills.length === 0) {
      toast.error('All fields are required');
      return;
    }
    callApi(edited);
  };

  // Call API
  const callApi = async (isEdited) => {
    try {
      const response = isEdited ? await updateJob(jobDataForm, jobdata._id, token) : await createJob(jobDataForm, companyLogo.current.files[0], token);
      if (response) {
        setJobDataForm({
          companyName: '',
          jobPosition: '',
          salary: '',
          location: '',
          jobDescription: '',
          aboutCompany: '',
          jobType: 'jobType',
          locationType: 'locationType',
          skills: [],
        });
        if(isEdited){
         navigate('/');
         return ;
        }
         companyLogo.current.value = '';

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Return data and functions
  return {
    jobDataForm,
    onChangeHandler,
    onSubmitHandler,
    addSkillHandler,
    removeSkillHandler,
    companyLogo,
  };
};
