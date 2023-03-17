const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}