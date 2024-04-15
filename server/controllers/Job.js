const Job=require('../models/Job');
const respondWithError = (res, statusCode, message) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };

exports.createJob=async (req,res)=>{
    try{
        const {companyName,logoUrl,jobPosition,jobType,mode,location,jobDescription,aboutCompany,skills,additionalInformation,salary}=req.body;
        const userId=req.user.id;
        const job=await Job.create({
            companyName:companyName,
            logoUrl:logoUrl,
            jobPosition:jobPosition,
            jobType:jobType,
            mode:mode,
            location:location,
            jobDescription:jobDescription,
            aboutCompany:aboutCompany,
            skills:skills,
            additionalInformation:additionalInformation,
            salary:salary,
            jobPoster:userId
        }) 
        return res.status(201).json({
            success:true,
            data:job
        })
    }catch(error){
        console.error("error while creating a job",error);
        respondWithError(res, 500, 'something went wrong. Please try again.');
    }
}
exports.getJobs = async (req, res) => {
    try {
        const { search, skills } = req.query;
        const query = {};

       // Add jobPosition to the query if search is provided
       if (search !== undefined) {
        query.jobPosition = search;
      }

      // Add skills to the query with $all operator
      if (skills !== undefined) {
        query.skills = { $all: skills.split(',') }; // Split skills string into an array
      }

        // Fetch jobs based on the query
        const jobs = await Job.find(query);

        console.log(jobs);
        res.status(200).json({
            success: true,
            jobs: jobs // Optionally send the jobs data in the response
        });
    } catch (err) {
        console.error('Error fetching jobs:', err);
        respondWithError(res, 500, 'Something went wrong. Please try again.');
    }
}




exports.getJobDetails=async (req,res)=>{
    try{
        const {jobId}=req.params;
        const jobDetails=await Job.findById({_id:jobId});
        if(!jobDetails){
            respondWithError(res, 401, 'Invalid jobId');
        }
        return res.status(200).json({
            success:true,
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
       const {companyName,logoUrl,jobPosition,jobType,mode,location,jobDescription,aboutCompany,skills,additionalInformation,salary}=req.body;
       const job=await Job.findByIdAndUpdate({
        _id:jobId},{
            companyName:companyName,
            logoUrl:logoUrl,
            jobPosition:jobPosition,
            jobType:jobType,
            mode:mode,
            location:location,
            jobDescription:jobDescription,
            aboutCompany:aboutCompany,
            skills:skills,
            additionalInformation:additionalInformation,
            salary:salary,
       },{new:true});
        if(!job){
            respondWithError(res, 401, 'Invalid jobId');
        }
        return res.status(200).json({
            success:true,
            data:job
        })
    }catch(error){
        respondWithError(res, 500, 'something went wrong. Please try again.');
    }
}