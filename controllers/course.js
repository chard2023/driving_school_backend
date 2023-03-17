const Course = require('../models/course');

const getCourses = (req, res) => {
    Course.find()
    .then((courses) => {
    res.json(courses);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting Courses' });
    });
};

const getCourseById = (req, res) => {
    const { id } = req.params;

    Course.findById(id)
    .then((course) => {
    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error getting course' });
    });
};

const createCourse = (req, res) => {
    const { img,
        course_name,
        sub_course_name,
        short_desc,
        long_desc,
        starting_price,
        branches,
        vehicle_courses,
        training_center,
        sub_courses } = req.body;
    const course = new Course({ img,
        course_name,
        sub_course_name,
        short_desc,
        long_desc,
        starting_price,
        branches,
        vehicle_courses,
        training_center,
        sub_courses });
    course.save()
    .then((savedCourse) => {
        console.log('Product saved to database:', savedCourse);
        res.status(201).json(savedCourse);
    })
    .catch((err) => {
        console.error('Error saving course to database:', err);
        res.status(500).json({ error: 'Error creating course' });
    });
};

const updateCourse = (req, res) => {
    const { id } = req.params;
    const update = req.body;

    Course.findByIdAndUpdate(id, update, { new: true })
    .then((updatedCourse) => {
        res.json(updatedCourse);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error updating course' });
    });
};

const deleteCourse = (req, res) => {
    const { id } = req.params;
    
    Course.findByIdAndDelete(id)
    .then(() => {
        res.json({ success: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error deleting course' });
    });
};

module.exports = {
getCourses,
getCourseById,
createCourse,
updateCourse,
deleteCourse,
};