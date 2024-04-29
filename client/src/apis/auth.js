import axios from "axios";
import {toast} from 'react-hot-toast'
import { setToken } from "../slices/authSlice";
export const signup=async ({name,email,mobile,password},navigate,dispatch)=>{
  const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/signup`;
  try {
  
    const mobileNo=Number(mobile);
    const response = await axios.post(url, { name, email, mobileNo, password }, {
      validateStatus: function (status) {
        return status===401||status===200||400;
      }
    });
    if(response.status===200){
      toast.success("User Signup Succesfully")
      await login(email,password,navigate,dispatch);

     }else if(response.status===401){
       navigate('/login');
       toast.error("User already exist please login")
     }else{
      toast.error(response.data.message)
     }
     return response;
  } catch (error) {
    console.log(error);
  }
}
export const login=async (email,password,navigate,dispatch)=>{
  const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`;
  try {
    const response = await axios.post(
      url,
      { email, password },
      {
        withCredentials: true,
        validateStatus: function (status) {
          return status === 401 || status === 200 || status === 402;
        }
      }
    );    
    if(response.status===200){
      dispatch(setToken(response.data.token));
      localStorage.setItem('token',JSON.stringify(response.data.token));
      localStorage.setItem('userId',JSON.stringify(response.data.userId));
      navigate('/');
      toast.success("Logged SuccesFully");
    }else if(response.status===401) {
      toast.error(response.data.message);
      navigate('/signup');
    }else {
      console.log(response.data.message)
      toast.error(response.data.message);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}