import axios from "axios";
import toast from "react-hot-toast";
export  const resetPasswordToken=async (email,setEmailSent)=>{
  try{
    const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/reset-password-token`;
    const response=await axios.post(url, {email }, {
        validateStatus: function (status) {
          return status===401||status===201;
        }
      })
    if(response?.status===201){
     setEmailSent(true);
     toast.success(response?.data.message);
    }else if (response?.status===401){
     toast.error(response?.data.message);
    }else{
     toast.error(response?.data.message)
    }
  }catch(error){

  }
}

export  const resetPassword=async ({password,confirmPassword},token)=>{
    try{
        const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/reset-password`;
        const response=await axios.post(url, {password,confirmPassword,token}, {
            validateStatus: function (status) {
              return status===401||status===403||status===201;
            }
          })
        if(response?.status===401){
          toast.error(response.data.message);
        }else if(response?.status===403){
          toast.error(response.data.message);
        }else{
          toast.success(response.data.message);
        }
    }catch(error){
        console.log(error);
        toast.error("Something went plz try again later");
    }
}