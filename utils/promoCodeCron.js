const PromoCode = require('../models/promoCode');

const checkExpiredPromoCodes = async () => {
  try {
    // Find all Promo Codes that have expired
    const expiredPromoCodes = await PromoCode.find({
      status: 'active',
      expiration: { $lte: new Date() },
    });

    // Check if any expired Promo Codes were found before updating
    if (expiredPromoCodes.length > 0) {
      // Update the status of expired Promo Codes to 'expired'
      await PromoCode.updateMany(
        { _id: { $in: expiredPromoCodes.map((p) => p._id) } },
        { $set: { status: 'expired' } }
      );
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = checkExpiredPromoCodes;
