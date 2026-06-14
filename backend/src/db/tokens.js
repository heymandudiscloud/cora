const pool = require('./index');

// =============================================================
// READ
// =============================================================

const getPasswordResetToken = async (token) => {
  const result = await pool.query(
    `SELECT id, token, expires_at FROM password_reset_tokens WHERE token = $1`,
    [token]
  );
  return result.rows[0];
};

// =============================================================
// CREATE
// =============================================================

const createPasswordResetToken = async (userId, token, expiresAt) => {
  const result = await pool.query(
    `INSERT INTO password_reset_tokens (user_id, token, expires_at)
    VALUES ($1, $2, $3)
    RETURNING id, token, expires_at`,
    [userId, token, expiresAt]
  );
  return result.rows[0];
};

// =============================================================
// UPDATE
// =============================================================

const markTokenAsUsed = async (id) => {
  const result = await pool.query(
    `UPDATE password_reset_tokens
     SET used_at = NOW()
     WHERE id = $1
     RETURNING id`,
    [id]
  );
  return result.rows[0];
};

// =============================================================
// DELETE
// =============================================================

const deletePasswordResetToken = async (id) => {
  // query here
};

module.exports = {
  getPasswordResetToken,
  createPasswordResetToken,
  markTokenAsUsed,
  deletePasswordResetToken
};