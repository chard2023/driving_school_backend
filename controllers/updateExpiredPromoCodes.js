const updateExpiredPromoCodes = require('../utils/promoCodeCron');

module.exports = async (req, res) => {
  try {
    await updateExpiredPromoCodes();
    res.status(200).send('Expired promo codes updated successfully');
  } catch (error) {
    console.error('Error updating expired promo codes:', error);
    res.status(500).send('Error updating expired promo codes');
  }
};
