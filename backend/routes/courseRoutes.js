const express = require('express');
const router = express.Router();
const { getCourses, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { authenticate } = require('../middleware/auth');

router.get('/', getCourses);
router.post('/', authenticate, createCourse);
router.put('/:id', authenticate, updateCourse);
router.delete('/:id', authenticate, deleteCourse);

module.exports = router;
