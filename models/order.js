const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fname: {
    type: String
  },
  mname: {
    type: String
  },
  lname: {
    type: String
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  customer: {
    type: Object
  },
  payment: {
    type: Object
  },
  courses: {
    type: Array
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;