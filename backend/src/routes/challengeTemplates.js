const express = require('express');
const router = express.Router();
const challengeTemplatesController = require('../controllers/challengeTemplates');
const { authenticate } = require('../middleware/auth');

// Public — browsing templates doesn't require login
router.get('/', challengeTemplatesController.getPublicTemplates);    // Browse all public templates
router.get('/:id', challengeTemplatesController.getTemplate);        // View a single template

// Protected — creating/managing templates requires login
router.post('/', authenticate, challengeTemplatesController.createTemplate);           // Create new template
router.get('/mine', authenticate, challengeTemplatesController.getMyTemplates);        // My templates
router.put('/:id', authenticate, challengeTemplatesController.updateTemplate);         // Edit template
router.delete('/:id', authenticate, challengeTemplatesController.deleteTemplate);      // Delete template

module.exports = router;