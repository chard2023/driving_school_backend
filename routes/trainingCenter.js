const express = require('express');
const router = express.Router();

const TC_Controller = require('../controllers/trainingCenter');

// GET /api/TCs
router.get('/', TC_Controller.getTCs);

// GET /api/TC/:id
router.get('/:id', TC_Controller.getTCById);

// POST /api/TC
router.post('/', TC_Controller.createTC);

// PUT /api/TC/:id
router.put('/:id', TC_Controller.updateTC);

// DELETE /api/TC/:id
router.delete('/:id', TC_Controller.deleteTC);

module.exports = router;
