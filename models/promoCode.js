const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  promo_code: { type: String, required: true },
  status: { type: String, required: true },
  discount_type: { type: String, required: true }, //amount/percentage
  value: { type: Number, required: true },
  expiration: { type: Date, required: true },
});

try {
  const PromoCode = mongoose.model('Promos');
  module.exports = PromoCode;
} catch (error) {
  const PromoCode = mongoose.model('Promos', PromoSchema);
  module.exports = PromoCode;
}
