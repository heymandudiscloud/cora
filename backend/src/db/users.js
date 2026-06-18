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

const getUserByEmailSafe = async (email) => {
  const result = await pool.query(
    `SELECT id, email, username, first_name, last_name, bio, profile_photo_url, 
    is_private, is_verified, email_verified, total_fuel, challenges_completed, 
    longest_streak, hide_fuel_by_default, account_status, created_at, updated_at
    FROM users WHERE email = $1`,
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

const getUserByUsernameSafe = async (username) => {
  const result = await pool.query(
    `SELECT id, email, username, first_name, last_name, bio, profile_photo_url, 
    is_private, is_verified, email_verified, total_fuel, challenges_completed, 
    longest_streak, hide_fuel_by_default, account_status, created_at, updated_at
    FROM users WHERE username = $1`,
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

const getUserByIdSafe = async (id) => {
  const result = await pool.query(
    `SELECT id, email, username, first_name, last_name, bio, profile_photo_url, 
    is_private, is_verified, email_verified, total_fuel, challenges_completed, 
    longest_streak, hide_fuel_by_default, account_status, created_at, updated_at
    FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

const getChallenges = async (id, status = null, isPinned = null) => {
  let query = `SELECT id, custom_name, privacy, status, start_date, end_date,
               current_streak, longest_streak, total_fuel, is_pinned,
               completed_at, abandoned_at, created_at, updated_at
               FROM challenge_instances WHERE owner_id = $1`
  const params = [id];

  if (isPinned !== null) {
    query += ` AND is_pinned = $${params.length + 1}`
    params.push(isPinned);
  }

  if (status) {
    query += ` AND status = $${params.length + 1}`;
    params.push(status);
  }
  const result = await pool.query(query, params);
  return result.rows;
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
};

const updateUserPassword = async (id, passwordHash) => {
  const result = await pool.query(
    `UPDATE users
     SET password_hash = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id`,
    [passwordHash, id]
  );
  return result.rows[0];
};

// =============================================================
// DELETE
// =============================================================

const deleteUser = async (id) => {
  // query here
};

module.exports = {
  getUserByEmail,
  getUserByEmailSafe,
  getUserByUsername,
  getUserByUsernameSafe,
  getUserById,
  getUserByIdSafe,
  getChallenges,
  addUser,
  updateUser,
  updateUserPassword,
  deleteUser
};
