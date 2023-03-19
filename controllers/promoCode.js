const Promo = require('../models/promoCode');
const startPromoCodeCron = require('../utils/promoCodeCron');


const getPromo = async (req, res) => {
    // Update expired promo codes
    try {
        await startPromoCodeCron();
    } catch (error) {
        console.error('Error updating expired promo codes:', error);
    }
    Promo.find()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error getting Promo codes' });
    });
};

const getPromoById = (req, res) => {
    const { id } = req.params;
    Promo.findById(id)
    .then((data) => {
    if (!data) {
        return res.status(404).json({ error: 'Promo code not found' });
    }
    res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error getting Promo code' });
    });
};

const getPromoByCode = async (req, res) => {
    const promo_code = req.params.promo_code;
    
    // Update expired promo codes
    try {
        await startPromoCodeCron();
    } catch (error) {
        console.error('Error updating expired promo codes:', error);
    }
    
    Promo.findOne({ promo_code })
      .then((promo) => {
        if (!promo) {
          return res.status(404).json({ error: 'Promo code not found' });
        }
        if (promo.status === 'expired') {
            return res.status(400).json({ error: 'Promo code has expired' });
        }
        res.status(200).json(promo);
      })
      .catch((err) => {
        console.error('Error retrieving promo code:', err);
        res.status(500).json({ error: 'Error retrieving promo code' });
      });
};

const createPromo = (req, res) => {
    generateUniquePromoCode(6)
    .then((promoCode) => {
      const newPromoCode = new Promo({
        name: req.body.name,
        promo_code: promoCode,
        status: 'active',
        discount_type: req.body.discount_type,
        value: req.body.value,
        expiration: req.body.expiration,
      });
      return newPromoCode.save();
    })
    .then((data) => {
        console.log('Promo code saved to database:', data);
        res.status(201).json(data);
    })
    .catch((err) => {
        console.error('Error saving Promo code to database:', err);
        res.status(500).json({ error: 'Error creating Promo code' });
    });
}

const updatePromo = (req, res) => {
    const { id } = req.params;
    const update = req.body;

    Promo.findByIdAndUpdate(id, update, { new: true })
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error updating Promo code' });
    });
};

const deletePromo = (req, res) => {
    const { id } = req.params;
    
    Promo.findByIdAndDelete(id)
    .then(() => {
        res.json({ success: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error deleting Promo code' });
    });
};

function generateUniquePromoCode(length) {
    const chars = 'AB0CD1EF2GH3IJ4KL5MN6OP7QR8ST9UV0WXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return Promo.exists({ promo_code: code })
    .then((exists) => {
    if (exists) {
        return generateUniquePromoCode(length);
    }
    return code;
    });
}

module.exports = {
    getPromo,
    getPromoById,
    createPromo,
    updatePromo,
    deletePromo,
    getPromoByCode
};

