const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
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

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;