const express = require('express');
const User = require('../models/userModel');

// @POST /api/users/register
const registerUser = async (req, res) => {
    // validate request
    const { name, email, password, roles } = req.body;
    if (!name || !email || !password || !roles) {
        return res.status(400).json({ message: "Please provide all details" });
    }
    // check for valid roles
    const allowedRoles = ["recruiter", "jobseeker"];
    const isValid = roles.every(r => allowedRoles.includes(r));
    if (!isValid) {
        return res.status(400).json({ message: "Invalid role specified" });
    }
    // check if user exists
    let user = await User.findOne({ email });
    if (!user) {
        // if not add the user
        user = await User.create({ name, email, password, roles });
        return res.status(201).json({
        message: "User registered successfully",
        user: {
            name: user.name,
            email: user.email,
            roles: user.roles
        }
        });
    }
    // if user exists, update roles
    let roleAdded = false;
    roles.forEach(r => {
        if (!user.roles.includes(r)) {
        user.roles.push(r);
        roleAdded = true;
        }
    });
    // if no new role added, throw error
    if (!roleAdded) {
        return res.status(400).json({ message: "User already has this role" });
    }
    // save updated user
    await user.save();
    return res.status(200).json({
        message: "User updated successfully",
        user: {
        name: user.name,
        email: user.email,
        roles: user.roles
        }
    });
};

// @POST /api/users/login
const loginUser = async (req, res) => {

}

module.exports = { registerUser, loginUser };
