const express = require('express');
const router = express.Router();

const promoController = require('../controllers/promoCode');

// GET /api/promo
router.get('/', promoController.getPromo);

// GET /api/promo/:id
router.get('/:id', promoController.getPromoById);

// GET /api/promo/code/:promo_code
router.get('/code/:promo_code', promoController.getPromoByCode);

// POST /api/promo
router.post('/', promoController.createPromo);

// PUT /api/promo/:id
router.put('/:id', promoController.updatePromo);

// DELETE /api/promo/:id
router.delete('/:id', promoController.deletePromo);

module.exports = router;
