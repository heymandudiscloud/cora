const pool = require('./index');

// =============================================================
// READ
// =============================================================

const getUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

const getUserByUsername = async (username) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

// =============================================================
// CREATE
// =============================================================

const addUser = async (email, first_name, last_name, username, passwordHash) => {
 const result = await pool.query(
    `INSERT INTO users (email, first_name, last_name, username, password_hash)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, username, first_name, last_name, created_at`,
    [email, first_name, last_name, username, passwordHash]
  );
  return result.rows[0];
};

// =============================================================
// UPDATE
// =============================================================

const updateUser = async (id, fields) => {
  const result = await pool.query(
    `UPDATE users
    SET `
  )
};

// =============================================================
// DELETE
// =============================================================

const deleteUser = async (id) => {
  // query here
};

module.exports = {
  getUserByEmail,
  getUserByUsername,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};