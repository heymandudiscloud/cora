const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { authenticate } = require('../middleware/auth');

router.get('/me', authenticate, usersController.getMe);
router.put('/me', authenticate, usersController.updateMe);
router.delete('/me', authenticate, usersController.deleteMe);
router.get('/me/followers', authenticate, usersController.getFollowers);
router.get('/me/following', authenticate, usersController.getFollowing);
router.get('/me/challenges', authenticate, usersController.getMyChallenges);
router.get('/me/groups', authenticate, usersController.getMyGroups);
router.get('/me/feed', authenticate, usersController.getFeed);
router.get('/me/notifications', authenticate, usersController.getNotifications);
router.put('/me/notifications', authenticate, usersController.markAllNotificationsRead);
router.put('/me/notifications/:id', authenticate, usersController.markNotificationRead);
router.delete('/me/notifications/:id', authenticate, usersController.deleteNotification);
router.get('/me/settings', authenticate, usersController.getSettings);
router.put('/me/settings', authenticate, usersController.updateSettings);
router.get('/:id', usersController.getUser);
router.get('/:id/challenges', usersController.getUserChallenges);



module.exports = router;