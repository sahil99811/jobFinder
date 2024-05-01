import axios from 'axios'
import toast from 'react-hot-toast';


export const createJob=async ({companyName,jobPosition,salary,location,jobDescription,aboutCompany,jobType,locationType,skills},logo,token)=>{
    const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/job/createJob`;
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
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      validateStatus: function (status) {
        return status === 400 || status === 201||status===401||status===402||status===403;
      }
    })
    if(response?.status===201){
      toast.success(response.data.message);
      return true;
    }
      toast.error(response.data.message);
      return true;
    }catch(error){
       console.log(error);
       toast.error("Server Error try after sometime");
    }
}

export const updateJob=async ({companyName,jobPosition,salary,location,jobDescription,aboutCompany,jobType,locationType,skills},id,token)=>{
    try{
        const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/job/editjob/${id}`;
        console.log("update job api is called");
       const response= await axios.patch(url,{companyName,jobPosition,salary,location,jobDescription,aboutCompany,jobType,locationType,skills},{
          Authorization: `Bearer ${token}`,
          validateStatus: function (status) {
            return status === 400 || status === 201||status===401||status===402||status===403;
          }
        })
        if(response?.status===201){
          toast.success(response.data.message);
          return true;
        }
        toast.error(response.data.message);
        return false;
    }catch(error){
      console.log(error);
       toast.error("Server Error try after sometime");
  
    }
}

export const getJobDetails=async (jobid)=>{
    try{
        const userId=JSON.parse(localStorage.getItem('userId'));
        const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/job/JobDetails/${jobid}/${userId}`;
         axios.defaults.withCredentials = true;

        const result=await axios.get(url,{ withCredentials: true });
        return result?.data;
    }catch(error){
       console.log(error);
    }
}

export const getJobs=async (search,skills)=>{
    try{
      console.log("get jobs called");
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
        return ans?.data;
    }catch(error){
       console.log(error);
    }
}