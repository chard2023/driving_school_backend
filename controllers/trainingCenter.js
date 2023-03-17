const TrainingCenter = require('../models/trainingCenter');

const getTCs = (req, res) => {
    TrainingCenter.find()
    .then((tc) => {
    res.json(tc);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting Training Center' });
    });
};

const getTCById = (req, res) => {
    const { id } = req.params;

    TrainingCenter.findById(id)
    .then((tc) => {
    if (!tc) {
        return res.status(404).json({ error: 'Training Center not found' });
    }
    res.json(branch);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error getting Training Center' });
    });
};

const createTC = (req, res) => {
    const { img,
        name,
        phone,
        address,
        city,
        state,
        zip } = req.body;
    console.log("Request Body: ",req.body);
    const tc = new TrainingCenter({ img,
        name,
        phone,
        address,
        city,
        state,
        zip });

    tc.save()
    .then((savedTC) => {
        console.log('Training Center saved to database:', savedTC);
        res.status(201).json(savedTC);
    })
    .catch((err) => {
        console.error('Error saving Training Center to database:', err);
        res.status(500).json({ error: 'Error creating Training Center' });
    });
};

const updateTC = (req, res) => {
    const { id } = req.params;
    const update = req.body;

    TrainingCenter.findByIdAndUpdate(id, update, { new: true })
    .then((updatedTC) => {
        res.json(updatedTC);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error updating TC' });
    });
};

const deleteTC = (req, res) => {
    const { id } = req.params;
    
    TrainingCenter.findByIdAndDelete(id)
    .then(() => {
        res.json({ success: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error deleting TC' });
    });
};

module.exports = {
getTCs,
getTCById,
createTC,
updateTC,
deleteTC,
};