const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');
const opportunityController = require('../Controllers/opportunityController');

// get all
router.get('/opp', auth, asyncHandler(opportunityController.getAllOpportunities));

// get one
router.get('/opp/:id', auth, asyncHandler(opportunityController.getOpportunityById));

// update
router.patch('/opp/:id', auth, asyncHandler(opportunityController.updateOpportunity));

// create
router.post('/opp', auth, asyncHandler(opportunityController.createOpportunity));

// delete
router.delete('/opp/:id', auth, asyncHandler(opportunityController.deleteOpportunity));

module.exports = router;
