const express = require('express');

// @POST /api/users/register
const registerUser = (req, res) => {
    // Registration logic here
    const { name, email, password, role } = req.body;
    res.status(201).json({ message: 'user registered successfully', user: { name, email, role}});

}


// @POST /api/users/login
const loginUser = (req, res) => {
    // login logic here
}

module.exports = {
    registerUser,
    loginUser
};