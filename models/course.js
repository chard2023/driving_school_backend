const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  img: {
    type: String
  },
  course_name: {
    type: String
  },
  sub_course_name: {
    type: String
  },
  short_desc: {
    type: String
  },
  long_desc: {
    type: String
  },
  starting_price: {
    type: Number
  },
  branches: {
    type: [{
      _id: { type: String },
      name: { type: String}
    }]
  },
  vehicle_courses: {
    type: [{
      _id: { type: String },
      name: { type: String}
    }]
  },
  training_center: {
    type: [{
      _id: { type: String },
      name: { type: String}
    }]
  },
  sub_courses: {
    type: [{
      _id: { type: String },
      name: { type: String}
    }]
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;