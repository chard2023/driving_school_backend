const express = require('express');
const router = express.Router();

const branchController = require('../controllers/branch');

// GET /api/branches
router.get('/', branchController.getBranches);

// GET /api/branch/:id
router.get('/:id', branchController.getBranchById);

// POST /api/branch
router.post('/', branchController.createBranch);

// PUT /api/branch/:id
router.put('/:id', branchController.updateBranch);

// DELETE /api/branch/:id
router.delete('/:id', branchController.deleteBranch);

module.exports = router;
