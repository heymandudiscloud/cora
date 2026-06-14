const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail, getUserByEmailSafe, getUserByUsername, addUser, getUserByIdSafe } = require('../db/users');
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
        user
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
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserByIdSafe(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Validation Error!'})
    }

    res.status(200).json({ 
      message: 'Validation successful!',
      user: user
    });
  } catch (error) {
    console.error('Validation error: ', error);
    res.status(401).json({ error: 'Internal server error!'})
  }
};

const forgotPassword = async (req, res) => {
  res.json({ message: 'forgotPassword coming soon' });
};

const resetPassword = async (req, res) => {
  res.json({ message: 'resetPassword coming soon' });
};

module.exports = { 
  register,
  login,
  logout,
  validateSession,
  forgotPassword,
  resetPassword
};