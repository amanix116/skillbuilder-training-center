const express = require('express');
const router = express.Router();
const { getApplications, createApplication } = require('../controllers/applicationController');
const { authenticate } = require('../middleware/auth');

router.post('/', createApplication);
router.get('/', authenticate, getApplications);

module.exports = router;
