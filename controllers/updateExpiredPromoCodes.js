const updateExpiredPromoCodes = require('../utils/promoCodeCron');

const promoCodeStatus = async (req, res) => {
  try {
    await updateExpiredPromoCodes();
    res.status(200).send('Expired promo codes updated successfully');
  } catch (error) {
    console.error('Error updating expired promo codes:', error);
    res.status(500).send('Error updating expired promo codes');
  }
};

module.exports = promoCodeStatus;
