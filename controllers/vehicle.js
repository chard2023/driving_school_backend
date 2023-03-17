const VehicleCourse = require('../models/vehicle');

const getVehicles = (req, res) => {
    VehicleCourse.find()
    .then((vehicles) => {
    res.json(vehicles);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting Vehicles' });
    });
};

const getVehicleById = (req, res) => {
    const { id } = req.params;

    VehicleCourse.findById(id)
    .then((vehicle) => {
    if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(vehicle);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error getting Vehicle' });
    });
};

const createVehicle = (req, res) => {
    const { vehicle_course,
        training_vehicles,
        hour_rates } = req.body;
    console.log("Request Body: ",req.body);
    const vehicle = new VehicleCourse({ vehicle_course,
        training_vehicles,
        hour_rates });

        vehicle.save()
    .then((savedVehicle) => {
        console.log('Vehicle saved to database:', savedVehicle);
        res.status(201).json(savedVehicle);
    })
    .catch((err) => {
        console.error('Error saving Vehicle to database:', err);
        res.status(500).json({ error: 'Error creating Vehicle' });
    });
};

const updateVehicle = (req, res) => {
    const { id } = req.params;
    const update = req.body;

    VehicleCourse.findByIdAndUpdate(id, update, { new: true })
    .then((updatedVehicle) => {
        res.json(updatedVehicle);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error updating Vehicle' });
    });
};

const deleteVehicle = (req, res) => {
    const { id } = req.params;
    
    VehicleCourse.findByIdAndDelete(id)
    .then(() => {
        res.json({ success: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error deleting Vehicle' });
    });
};

module.exports = {
getVehicles,
getVehicleById,
createVehicle,
updateVehicle,
deleteVehicle,
};