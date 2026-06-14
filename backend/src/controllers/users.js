const { getUserByIdSafe } = require('../db/users');
const { getPasswordResetToken, createPasswordResetToken, markTokenAsUsed } = require('../db/tokens');


// Get own profile
const getMe = async (req, res) => {
  try {
    const user = await getUserByIdSafe(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found!' });
    res.status(200).json({ user: user });
  } catch (error) {
    console.error('getMe error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Update own profile
const updateMe = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Destructure fields from req.body
    // 3. Update user in database
    // 4. Return updated user
  } catch (error) {
    console.error('updateMe error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Delete own account
const deleteMe = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Schedule account for deletion
    // 3. Return success
  } catch (error) {
    console.error('deleteMe error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Get another user's profile
const getUser = async (req, res) => {
  try {
    // 1. Get id from req.params.id
    // 2. Fetch user from database using getUserByIdSafe
    // 3. If no user found, return 404
    // 4. Return user object
  } catch (error) {
    console.error('getUser error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Get own followers
const getFollowers = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Fetch followers from follows table
    // 3. Return followers list
  } catch (error) {
    console.error('getFollowers error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Get own following
const getFollowing = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Fetch following from follows table
    // 3. Return following list
  } catch (error) {
    console.error('getFollowing error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Get own challenge instances
const getMyChallenges = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Get optional status filter from req.query.status
    // 3. Fetch challenge instances from database
    // 4. Return instances
  } catch (error) {
    console.error('getMyChallenges error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Get another user's challenge instances
const getUserChallenges = async (req, res) => {
  try {
    // 1. Get id from req.params.id
    // 2. Fetch public challenge instances from database
    // 3. Return instances
  } catch (error) {
    console.error('getUserChallenges error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Get own groups
const getMyGroups = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Fetch groups from group_members table
    // 3. Return groups list
  } catch (error) {
    console.error('getMyGroups error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Get home feed
const getFeed = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Fetch proof submissions from followed users and groups
    // 3. Return feed
  } catch (error) {
    console.error('getFeed error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Get notifications
const getNotifications = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Fetch notifications from database
    // 3. Return notifications
  } catch (error) {
    console.error('getNotifications error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Mark all notifications as read
const markAllNotificationsRead = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Update all notifications to is_read = true
    // 3. Return success
  } catch (error) {
    console.error('markAllNotificationsRead error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Mark single notification as read
const markNotificationRead = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Get notification id from req.params.id
    // 3. Update notification to is_read = true
    // 4. Return success
  } catch (error) {
    console.error('markNotificationRead error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Get notification id from req.params.id
    // 3. Delete notification from database
    // 4. Return success
  } catch (error) {
    console.error('deleteNotification error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Get account settings
const getSettings = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Fetch settings from database
    // 3. Return settings
  } catch (error) {
    console.error('getSettings error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

// Update account settings
const updateSettings = async (req, res) => {
  try {
    // 1. Get user id from the auth token
    // 2. Destructure fields from req.body
    // 3. Update settings in database
    // 4. Return updated settings
  } catch (error) {
    console.error('updateSettings error: ', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

module.exports = {
  getMe,
  updateMe,
  deleteMe,
  getUser,
  getFollowers,
  getFollowing,
  getMyChallenges,
  getUserChallenges,
  getMyGroups,
  getFeed,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  deleteNotification,
  getSettings,
  updateSettings
};