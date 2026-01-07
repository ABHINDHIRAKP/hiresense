const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword, roles });
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
    const { email, password } = req.body;
    // validate request
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all details"});
    }
    // check if user exists
    const user = await User.findOne({email});
    if (user && await bcrypt.compare(password, user.password)) {
        
        const accessToken = jwt.sign(
            {
                id: user._id,
                roles: user.roles
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m'}
        )
        return res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                roles: user.roles
            },
            accessToken
        })
        
    }
    else {
        return res.status(401).json({ message: "Invalid credentials"});
    }


}

module.exports = { registerUser, loginUser };
