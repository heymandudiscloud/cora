const pool = require('./index');

// =============================================================
// READ
// =============================================================

// Get a single template by id
const getTemplateById = async (id) => {
  const result = await pool.query(
    `SELECT id, creator_id, name, description, category, duration_days,
     is_public, is_archived, instance_count, total_fuel, created_at, updated_at
     FROM challenge_templates WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

// Get all public, non-archived templates
const getPublicTemplates = async () => {
  // TODO: SELECT explicit columns WHERE is_public = true AND is_archived = false
  // TODO: ORDER BY created_at DESC
};

// Get all templates created by a specific user
const getTemplatesByCreator = async (creatorId) => {
  // TODO: SELECT explicit columns WHERE creator_id = $1 AND is_archived = false
};

// =============================================================
// CREATE
// =============================================================

const createChallengeTemplate = async (creatorId, name, description, durationDays, category, isPublic, isCommunity) => {
    const result = await pool.query(
        `INSERT INTO challenge_templates (creator_id, name, description, category, duration_days, is_public, is_community)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, creator_id, name, description, category, duration_days, is_public, is_community, is_archived, created_at, updated_at`, [creatorId, name, description, category, durationDays, isPublic, isCommunity]
    );
    return result.rows[0];
};

// =============================================================
// UPDATE
// =============================================================

const updateTemplate = async (id, fields) => {
  // TODO: UPDATE challenge_templates SET ...fields, updated_at = NOW() WHERE id = $1
  // TODO: RETURNING explicit columns
};

// =============================================================
// DELETE
// =============================================================

// Soft delete — sets is_archived = true rather than removing the row
// Preserves integrity for any instances that reference this template
const archiveTemplate = async (id) => {
  // TODO: UPDATE SET is_archived = true, updated_at = NOW() WHERE id = $1
  // TODO: RETURNING id
};

module.exports = {
  getTemplateById,
  getPublicTemplates,
  getTemplatesByCreator,
  createChallengeTemplate,
  updateTemplate,
  archiveTemplate,
};