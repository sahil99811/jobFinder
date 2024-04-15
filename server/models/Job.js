const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    aboutCompany: {
        type: String,
        required: true
    },
    skills: [
        {
            type: String,
            required: true
        }
    ],
    additionalInformation: {
        type: String
    },
    salary: {
        type: String
    },
    jobPoster: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('job', jobSchema);
