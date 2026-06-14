const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { getUserByEmail, getUserByEmailSafe, getUserByUsername, addUser, getUserByIdSafe, updateUserPassword } = require('../db/users');
const { getPasswordResetToken, createPasswordResetToken, markTokenAsUsed } = require('../db/tokens');
const register = async (req, res) => {
  try {
    // 1. Destructure the fields from req.body
    const { email, first_name, last_name, username, password } = req.body;

    // 2. Validate that all required fields exist
    // if missing, return 400 error
    if (!email || !first_name || !last_name || !username || !password) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    // 3. Check if email already exists in the database
    // if it does, return 409 error
    if (await getUserByEmail(email)) {
        return res.status(409).json({ error: 'An account with these details already exists!' });
    }

    // 4. Check if username already exists in the database
    // if it does, return 409 error
    if (await getUserByUsername(username)) {
        return res.status(409).json({ error: 'An account with these details already exists!' });
    }

    // 5. Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 6. Insert the new user into the database
    // return id, email, username, first_name, last_name, created_at
    const user = await addUser(email, first_name, last_name, username, hashedPassword);

    // 7. Generate a JWT token with the user id
    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d'}
    );

    // 8. Return 201 with the token and user object
    res.status(201).json({ 
        message: 'Account created successfully!',
        token: token,
        user: user
    });

  } catch (error) {
    // 9. Log the error and return 500
    console.error('Register error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

const login = async (req, res) => {
  try {
    const {email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields!'});
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Login error!'});
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Login error!'});
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d'}
    );

    const safeUser = await getUserByEmailSafe(email);  

    res.status(200).json({ 
      message: 'Login successful!',
      token: token,
      user: safeUser
    });

  } catch (error) {
    console.error('Login error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  };
};

const logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful!'});
  } catch (error) {
    console.error('Logout error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

const validateSession = async (req, res) => {
  try {
    const user = await getUserByIdSafe(req.user.id);

    if (!user) {
      return res.status(401).json({ error: 'Validation Error!' });
    }

    res.status(200).json({ 
      message: 'Validation successful!',
      user: user
    });
  } catch (error) {
    console.error('Validation error: ', error);
    res.status(401).json({ error: 'Internal server error!' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    const resetToken = crypto.randomBytes(32).toString('hex');
    if (user) {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await createPasswordResetToken(user.id, resetToken, expiresAt);
      // send email here later
    }

    res.status(200).json({
      message: 'If an account exists with that email, a reset link has been sent.',
    })
  } catch (error) {
    console.error('Token error: ', error);
    res.status(401).json({ error: 'Internal server error!'})
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const tokenRow = await getPasswordResetToken(token);

    if (!tokenRow) {
      return res.status(400).json({ error: 'Reset error!' });
    } 
    if (new Date(tokenRow.expires_at) < Date.now()) {
      return res.status(400).json({ error: 'Reset error!' });
    }
    if (tokenRow.used_at) {
      return res.status(400).json({ error: 'Reset error!' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const user = await updateUserPassword(tokenRow.user_id, hashedPassword);

    await markTokenAsUsed(tokenRow.id);

    res.status(200).json({ message: 'Password reset successful!' })

  } catch (error) {
    res.status(401).json({ error: 'Internal server error!'})
  }
};

module.exports = { 
  register,
  login,
  logout,
  validateSession,
  forgotPassword,
  resetPassword
};