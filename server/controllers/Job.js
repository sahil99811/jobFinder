const Job=require('../models/Job');
const mongoose=require('mongoose');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const respondWithError = (res, statusCode, message) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };

exports.createJob=async (req,res)=>{
    try{
        const userId = req.user.id;
        const {
            companyName,
            jobPosition,
            jobDescription,
            salary,
            location,
            locationType,
            skills,
            jobType,
            aboutCompany
        } = req.body;
        const {logo}=req.files;
        if (
            !companyName ||
            !logo ||
            !jobPosition ||
            !jobDescription ||
            !salary ||
            !location ||
            !locationType ||
            !skills ||
            !jobType ||
            !aboutCompany
        ) {
            return res.status(400).json({
                success:false,
                message: "all field required",
            });
        }
        const cloudinaryImage=await uploadImageToCloudinary(logo);
        await Job.create({
            companyName,
            logoUrl:cloudinaryImage.secure_url,
            title:jobPosition ,
            description:jobDescription,
            salary,
            location,
            locationType,
            skills:JSON.parse(skills),
            jobType,
            aboutCompany,
            refUserId:new mongoose.Types.ObjectId(userId)
         });
        return res.status(201).json({
            success:true,
            message:"job created successfully"
        })
    }catch(error){
        console.error("error while creating a job",error);
        respondWithError(res, 500, 'something went wrong. Please try again.');
    }
}
const fetchJobs = async (req, res, query) => {
    try {
        const { search, skills } = req.query;
        console.log("priting in getjobdetails",req.cookies.token);
        // Add jobPosition to the query if search is provided
        if (search !== undefined) {
            query.jobPosition = { $regex: search, $options: "i" };
        }

        // Add skills to the query with $all operator
        if (skills !== undefined) {
            const caseInsensitiveSkills = skills.split(',').map((value) => {
                return new RegExp(value, "i")
            });
            query.skills = { $all: caseInsensitiveSkills };
        }
        
        // Fetch jobs based on the query
        const jobs = await Job.find(query,{companyName:1,title:1,salary:1,location:1,locationType:1,jobType:1,skills:1,logoUrl:1});

        res.status(200).json({
            success: true,
            jobs: jobs // Optionally send the jobs data in the response
        });
    } catch (err) {
        console.error('Error fetching jobs:', err);
        respondWithError(res, 500, 'Something went wrong. Please try again.');
    }
}

exports.getJobs = async (req, res) => {
    const query = {};
    await fetchJobs(req, res, query);
}




exports.getJobDetails=async (req,res)=>{
    try{
        const {jobId,userId}=req.params;
        console.log("priting in getjobdetails",req.cookies.token)
        const jobDetails=await Job.findById({_id:jobId});
        if(!jobDetails){
            respondWithError(res, 401, 'Invalid jobId');
        }
        const isJobPoster=userId===jobDetails.refUserId.toString();
        return res.status(200).json({
            success:true,
            jobPoster:isJobPoster,
            data:jobDetails
        })
    }catch(err){
        console.log(err)
        respondWithError(res, 500, 'something went wrong. Please try again.');
    }
}
exports.editJob=async(req,res)=>{
    try{
       const {jobId}=req.params;
       const {companyName,
        jobPosition,
        jobDescription,
        salary,
        location,
        locationType,
        skills,
        jobType,
        aboutCompany}=req.body;
        if (
            !companyName ||
            !jobPosition ||
            !jobDescription ||
            !salary ||
            !location ||
            !locationType ||
            !skills ||
            !jobType ||
            !aboutCompany
        ) {
            return res.status(400).json({
                success:false,
                message: "all field required",
            });
        }
        console.log(typeof skills,jobId);
       const job=await Job.findByIdAndUpdate({
        _id:jobId},{
            companyName,
            title:jobPosition ,
            description:jobDescription,
            salary,
            location,
            locationType,
            skills:skills,
            jobType,
            aboutCompany,
       });
       
        if(!job){
            respondWithError(res, 401, 'Invalid jobId');
        }
        return res.status(201).json({
            success:true,
            message:'Job edit succesfully'
        })
    }catch(error){
        respondWithError(res, 500, 'something went wrong. Please try again.');
    }
}