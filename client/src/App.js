
import './App.css';
import {Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JobDetails from './pages/JobDetails';
import CreateJob from './pages/CreateJob';
import PrivateRoute from './components/core/auth/PrivateRoute'
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/signup' element={<Signup></Signup>}/>
        <Route path='/job/:jobId' element={<JobDetails></JobDetails>}/>
        <Route path='/createjob'
          element={
            <PrivateRoute>
              <CreateJob></CreateJob>
            </PrivateRoute>
          }
        ></Route>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:token' element={<UpdatePassword/>} />
      </Routes>
    </>
  );
}

export default App;
