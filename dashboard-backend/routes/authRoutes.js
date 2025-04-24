const express = require('express');
const router = express.Router();
const { 
  login,
  register,
  getCurrentUser, 
  updateProfile,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyToken
} = require('../controllers/authController');

// Import auth middleware (we'll create this next)
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', login);
router.post('/register', register); // This will be restricted to admin in a real app
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.use(protect); // All routes after this line will require authentication
router.get('/me', getCurrentUser);
router.put('/profile', updateProfile);
router.post('/logout', logout);
router.post('/change-password', changePassword);
router.get('/verify', verifyToken);

module.exports = router;