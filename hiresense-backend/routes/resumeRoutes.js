const express = require('express');
const router = express.Router();
const uploadResume = require('../middleware/uploadResume');

// @POSt /api/resume/upload
router.route('/upload').post(uploadResume.single('resume'));

module.exports = router;