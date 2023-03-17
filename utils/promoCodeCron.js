const cron = require('node-cron');
const Promo = require('../models/PromoCode');

const promoCodeCron = {
  start: () => {
    // Check for expired Promo Codes every hour
    cron.schedule('0 * * * *', async () => {
      try {

        // Find all Promo Codes that have expired
        const expiredPromoCodes = await Promo.find({
          status: 'active',
          expiration: { $lte: new Date() },
        });

        // Check if any expired Promo Codes were found before updating
        if (expiredPromoCodes.length > 0) {
          // Update the status of expired Promo Codes to 'expired'
          await Promo.updateMany(
            { _id: { $in: expiredPromoCodes.map((p) => p._id) } },
            { $set: { status: 'expired' } }
          );
        }
      } catch (err) {
        console.error(err);
      }
    });
  },
};

module.exports = promoCodeCron;