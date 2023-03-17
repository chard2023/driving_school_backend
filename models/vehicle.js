const mongoose = require('mongoose');

const VehicleCourseSchema = new mongoose.Schema({
    vehicle_course: {
        type: String,
    },
    training_vehicles: {
        type: [{
            name: {
                type: String,
            },
        }]
    },
    hour_rates: {
        type: [{
            hour: {
                type: Number,
            },
            rate: {
                type: Number,
            }
        }]
    },
});

const VehicleCourse = mongoose.model('vehicle_course', VehicleCourseSchema);

module.exports = VehicleCourse;