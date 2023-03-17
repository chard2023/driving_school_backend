const Branch = require('../models/branch');

const getBranches = (req, res) => {
    Branch.find()
    .then((branches) => {
    res.json(branches);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting Branches' });
    });
};

const getBranchById = (req, res) => {
    const { id } = req.params;

    Branch.findById(id)
    .then((branch) => {
    if (!branch) {
        return res.status(404).json({ error: 'Branch not found' });
    }

    res.json(branch);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error getting branch' });
    });
};

const createBranch = (req, res) => {
    const { img,
        name,
        phone,
        address,
        city,
        state,
        zip } = req.body;
    console.log("Request Body: ",req.body);
    const branch = new Branch({ img,
        name,
        phone,
        address,
        city,
        state,
        zip });

    branch.save()
    .then((savedBranch) => {
        console.log('Branch saved to database:', savedBranch);
        res.status(201).json(savedBranch);
    })
    .catch((err) => {
        console.error('Error saving branch to database:', err);
        res.status(500).json({ error: 'Error creating branch' });
    });
};

const updateBranch = (req, res) => {
    const { id } = req.params;
    const update = req.body;

    Branch.findByIdAndUpdate(id, update, { new: true })
    .then((updatedBranch) => {
        res.json(updatedBranch);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error updating Branch' });
    });
};

const deleteBranch = (req, res) => {
    const { id } = req.params;
    
    Branch.findByIdAndDelete(id)
    .then(() => {
        res.json({ success: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error deleting Branch' });
    });
};

module.exports = {
getBranches,
getBranchById,
createBranch,
updateBranch,
deleteBranch,
};