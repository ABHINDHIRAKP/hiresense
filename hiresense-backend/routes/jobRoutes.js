const express = require('express');
const router = express.Router();
const { createJob } = require('../controllers/jobController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').post(createJob);

module.exports = router;