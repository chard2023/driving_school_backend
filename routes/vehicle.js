const express = require('express');
const router = express.Router();

const vehicleCourseController = require('../controllers/vehicle');

// GET /api/vehicles
router.get('/', vehicleCourseController.getVehicles);

// GET /api/vehicle/:id
router.get('/:id', vehicleCourseController.getVehicleById);

// POST /api/vehicle
router.post('/', vehicleCourseController.createVehicle);

// PUT /api/vehicle/:id
router.put('/:id', vehicleCourseController.updateVehicle);

// DELETE /api/vehicle/:id
router.delete('/:id', vehicleCourseController.deleteVehicle);

module.exports = router;
