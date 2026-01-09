const express = require('express');
const Job = require('../models/jobModel');

// @POST /api/jobs
const createJob = async (req, res) => {
    const {title, description, minExperience, skills} = req.body;
    // validate input
    if (!title || !description || !skills || !minExperience) {
        return res.status(400).json({message: "Please provide all job details"});
    }
    // create job
    const job = await Job.create({
        recruiter: req.user.id,
        title,
        description,
        minExperience,
        skills
    });
    res.status(201).json({
        message: "Job created successfully",
        job
    });
}

// @GET /api/jobs
const getJobs = async (req, res) => {
    if (!req.user || !req.user.roles) {
        return res.status(401).json({message: "Unauthorized"});
    }

    // check if recruiter or jobseeker
    const filter = {};
    if (req.user.roles.includes('recruiter')) {
        filter.recruiter = req.user.id;
    }

    /* fetch jobs:
         - select only necessary fields
         - sort by creation date descending
         - if recruiter, then only the recruiter's jobs
         - if jobseeker, then all jobs
    */
    const jobs = await Job.find(filter)
    .select("title description recruiter")
    .sort({ createdAt: -1 })
    .populate("recruiter", "name email");

    res.status(200).json({
        message: "Jobs fetched successfully",
        jobs
    });
}

module.exports = {
    createJob,
    getJobs
};