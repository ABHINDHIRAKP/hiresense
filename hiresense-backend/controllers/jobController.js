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

module.exports = {
    createJob
};