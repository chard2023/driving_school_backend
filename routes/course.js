const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course');

// GET /api/Courses
router.get('/', courseController.getCourses);

// GET /api/Course/:id
router.get('/:id', courseController.getCourseById);

// POST /api/Course
router.post('/', courseController.createCourse);

// PUT /api/Course/:id
router.put('/:id', courseController.updateCourse);

// DELETE /api/Course/:id
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
