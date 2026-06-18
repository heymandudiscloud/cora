const express = require('express');
const router = express.Router();
const challengeInstancesController = require('../controllers/challengeInstances');
const { authenticate } = require('../middleware/auth');

// All instance routes are protected — you must be logged in
router.post('/', authenticate, challengeInstancesController.createInstance);          // Start a challenge
router.get('/mine', authenticate, challengeInstancesController.getMyInstances);       // My active/past runs
router.get('/:id', authenticate, challengeInstancesController.getInstance);           // Single instance detail
router.put('/:id', authenticate, challengeInstancesController.updateInstance);        // Edit instance settings
router.delete('/:id', authenticate, challengeInstancesController.deleteInstance);     // Abandon/delete
router.post('/:id/complete', authenticate, challengeInstancesController.completeInstance); // Mark complete

module.exports = router;