const mongoose = require('mongoose');

const trainingCenterSchema = new mongoose.Schema({
    img: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
});

const TrainingCenter = mongoose.model('Training_center', trainingCenterSchema);

module.exports = TrainingCenter;