const express = require('express');
const router = express.Router();
const { createJob } = require('../controllers/jobController');
const validateToken = require('../middleware/validateTokenHandler');
const authRole = require('../middleware/authoriseRole');

// execution flow -> POST '/' -> validateToken (sets req.user) -> authRole (checks roles) -> createJob
router.use(validateToken);
router.route('/').post(authRole("recruiter"), createJob);

module.exports = router;