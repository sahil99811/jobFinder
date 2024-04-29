const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        logoUrl: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        locationType: {
            type: String,
            required: true,
        },
        aboutCompany: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
        },
        skills: [
            {
                type: String,
                required: true,
            }
        ]
        ,
        refUserId: {
            type: mongoose.Types.ObjectId,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);