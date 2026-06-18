// POST /challenge-templates
const createTemplate = async (req, res) => {
  try {
    // TODO: pull fields from req.body
    // TODO: attach creator_id from req.user.id (set by auth middleware)
    // TODO: call db.createTemplate()
    // TODO: return 201 with the created template
  } catch (err) {
    console.error('Create template error:', err);
    res.status(500).json({ error: 'Failed to create template' });
  }
};

// GET /challenge-templates/:id
const getTemplate = async (req, res) => {
  try {
    // TODO: get id from req.params.id
    // TODO: call db.getTemplateById()
    // TODO: 404 if not found
    // TODO: return template
  } catch (err) {
    console.error('Get template error:', err);
    res.status(500).json({ error: 'Failed to get template' });
  }
};

// GET /challenge-templates (public browse)
const getPublicTemplates = async (req, res) => {
  try {
    // TODO: call db.getPublicTemplates()
    // TODO: return array
  } catch (err) {
    console.error('Get public templates error:', err);
    res.status(500).json({ error: 'Failed to get templates' });
  }
};

// GET /challenge-templates/mine
const getMyTemplates = async (req, res) => {
  try {
    // TODO: call db.getTemplatesByUser(req.user.id)
    // TODO: return array
  } catch (err) {
    console.error('Get my templates error:', err);
    res.status(500).json({ error: 'Failed to get your templates' });
  }
};

// PUT /challenge-templates/:id
const updateTemplate = async (req, res) => {
  try {
    // TODO: get id from req.params.id
    // TODO: fetch existing template first
    // TODO: check template.creator_id === req.user.id, else 403
    // TODO: call db.updateTemplate()
    // TODO: return updated template
  } catch (err) {
    console.error('Update template error:', err);
    res.status(500).json({ error: 'Failed to update template' });
  }
};

// DELETE /challenge-templates/:id
const deleteTemplate = async (req, res) => {
  try {
    // TODO: get id from req.params.id
    // TODO: fetch existing template first
    // TODO: check template.creator_id === req.user.id, else 403
    // TODO: call db.deleteTemplate()
    // TODO: return 204 no content
  } catch (err) {
    console.error('Delete template error:', err);
    res.status(500).json({ error: 'Failed to delete template' });
  }
};

module.exports = {
  createTemplate,
  getTemplate,
  getPublicTemplates,
  getMyTemplates,
  updateTemplate,
  deleteTemplate,
};