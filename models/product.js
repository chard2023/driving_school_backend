const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String
    // required: [true, 'A product must have a name']
  },
  starting_price: {
    type: Number
    // required: [true, 'A product must have a price']
  },
  description: {
    type: String
    // required: [true, 'A product must have a description']
  },
  region: {
    type: [String]
    // required: [true, 'A product must have a region']
  },
  course: {
    type: [{
      name: {
        type: String
        // required: [true, 'A course must have a name']
      },
      price: {
        type: Number
        // required: [true, 'A course must have a price']
      }
    }],
    // required: [true, 'A product must have at least one course']
  },
  hours: {
    type: [{
      hour: {
        type: String
        // required: [true, 'An hour must be specified']
      },
      price: {
        type: Number
        // required: [true, 'A price must be specified for the hour']
      }
    }],
    // required: [true, 'A product must have at least an item of hour']
  },
  training_vehicle: {
    type: [String]
    // required: [true, 'A product must have a region']
  },
  image: {
    type: String
    // required: [true, 'A product must have an image URL']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;