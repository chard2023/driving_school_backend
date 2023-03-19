const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');

// GET /api/orders
router.get('/', orderController.getOrders);

// GET /api/order/:id
router.get('/:id', orderController.getOrderById);

// POST /api/order
router.post('/', orderController.createOrder);

// PUT /api/order/:id
router.put('/:id', orderController.updateOrder);

// DELETE /api/order/:id
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
