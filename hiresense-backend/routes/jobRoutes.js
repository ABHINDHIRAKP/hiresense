const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');
const validateToken = require('../middleware/validateTokenHandler');
const authRole = require('../middleware/authoriseRole');

router.use(validateToken);
// execution flow -> POST '/' -> validateToken (sets req.user) -> authRole (checks roles) -> createJob
router.route('/').post(authRole("recruiter"), createJob);

// execution flow -> GET '/' -> validateToken (sets req.user) -> getJobs
router.route('/').get(getJobs);

module.exports = router;