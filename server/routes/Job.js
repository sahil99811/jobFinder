const express=require('express');
const router=express.Router();
const {createJob,getJobs,getJobDetails,editJob}=require('../controllers/Job');
const {auth}=require('../middlewares/Auth');
router.post('/createJob',auth,createJob);
router.get('/getJobs',getJobs);
router.get('/jobDetails/:jobId/:userId',getJobDetails);
router.put('/editJob/:jobId',editJob);
module.exports=router;