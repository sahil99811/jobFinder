import axios from 'axios'
import toast from 'react-hot-toast';


export const createJob=async ({companyName,jobPosition,salary,location,jobDescription,aboutCompany},skills,jobType,locationType,logo,token)=>{
    const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/job/createJob`;
   debugger;
    try{
    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('jobPosition', jobPosition);
    formData.append('salary', salary);
    formData.append('location', location);
    formData.append('jobDescription', jobDescription);
    formData.append('aboutCompany', aboutCompany);
    formData.append('skills', JSON.stringify(skills));
    formData.append('jobType', jobType);
    formData.append('locationType', locationType);
    formData.append('logo', logo);
    
    const response=await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
      validateStatus: function (status) {
        return status === 400 || status === 201;
      }
    })
    if(response?.status===201){
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
    }catch(error){
       console.log(error);
    }
}

export const updateJob=async ({companyName,logoUrl,jobPosition,jobType,mode,location,jobDescription,aboutCompany,skills,additionalInformation,salary})=>{
    try{
        const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/signup`;
        await axios.put(url,{companyName,logoUrl,jobPosition,jobType,mode,location,jobDescription,aboutCompany,skills,additionalInformation,salary})
    }catch(error){

    }
}

export const getJobDetails=async (jobid)=>{
    try{
        const userId=JSON.parse(localStorage.getItem('userId'));
        const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/job/JobDetails/${jobid}/${userId}`;
         axios.defaults.withCredentials = true;

        const result=await axios.get(url,{ withCredentials: true });
        return result.data;
    }catch(error){
       console.log(error);
    }
}

export const getJobs=async (search,skills)=>{
    try{
        let url = `${process.env.REACT_APP_BACKEND_BASE_URL}/job/getJobs`;
        if(search){
            url=url+`?search=${search}`;
        }else if(skills&&skills.length>0){
            const values = skills.join(",");
            if(search)
            url=url+`&skills=${values}`
            else
            url=url+`?skills=${values}`
        }
        const ans=await axios.get(url);
        return ans.data;
    }catch(error){
       console.log(error);
    }
}