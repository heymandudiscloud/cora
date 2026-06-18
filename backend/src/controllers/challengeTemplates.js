const { createChallengeTemplate } = require('../db/challengeTemplates');
 
// POST /challenge-templates
const createTemplate = async (req, res) => {
  try {
    const {name, description, duration_days, category, is_public, is_community} = req.body;
    const creator_id = req.user.id;

    if (!name || !description || !category || !duration_days) {
        return res.status(400).json({ error: 'name, description, category, and duration_days are required' });
    }
    const template = createChallengeTemplate(creator_id, name, description, duration_days, category, is_public, is_community);
    res.status(201).json(template)
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
};

// GET /challenge-templates
const getPublicTemplates = async (req, res) => {
  try {
    // TODO: call db.getPublicTemplates()
    // TODO: res.json(templates)
  } catch (err) {
    console.error('Get public templates error:', err);
    res.status(500).json({ error: 'Failed to get templates' });
  }
};

// GET /challenge-templates/mine
const getMyTemplates = async (req, res) => {
  try {
    // TODO: call db.getTemplatesByCreator(req.user.id)
    // TODO: res.json(templates)
  } catch (err) {
    console.error('Get my templates error:', err);
    res.status(500).json({ error: 'Failed to get your templates' });
  }
};

// GET /challenge-templates/:id
const getTemplate = async (req, res) => {
  try {
    // TODO: get id from req.params.id
    // TODO: call db.getTemplateById(id)
    // TODO: if not found, res.status(404).json({ error: 'Template not found' })
    // TODO: res.json(template)
  } catch (err) {
    console.error('Get template error:', err);
    res.status(500).json({ error: 'Failed to get template' });
  }
};

// PUT /challenge-templates/:id
const updateTemplate = async (req, res) => {
  try {
    // TODO: get id from req.params.id
    // TODO: call db.getTemplateById(id) to check it exists
    // TODO: if not found, 404
    // TODO: check template.creator_id === req.user.id, else res.status(403).json({ error: 'Forbidden' })
    // TODO: call db.updateTemplate(id, req.body)
    // TODO: res.json(updated)
  } catch (err) {
    console.error('Update template error:', err);
    res.status(500).json({ error: 'Failed to update template' });
  }
};

// DELETE /challenge-templates/:id
const deleteTemplate = async (req, res) => {
  try {
    // TODO: get id from req.params.id
    // TODO: call db.getTemplateById(id) to check it exists
    // TODO: if not found, 404
    // TODO: check template.creator_id === req.user.id, else 403
    // TODO: call db.archiveTemplate(id) — soft delete, not hard delete
    // TODO: res.status(204).send()
  } catch (err) {
    console.error('Delete template error:', err);
    res.status(500).json({ error: 'Failed to delete template' });
  }
};

module.exports = {
  createTemplate,
  getPublicTemplates,
  getMyTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
};