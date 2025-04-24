const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Import controller (we'll create this next)
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersByRole
} = require('../controllers/userController');

// Protect all routes
router.use(protect);

// Get users by role - must be before /:id routes
router.get('/role/:role', getUsersByRole);

// Base routes
router.route('/')
  .get(getAllUsers)
  .post(authorize('admin'), createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)  // Users can update their own, admins can update any
  .delete(authorize('admin'), deleteUser);

module.exports = router;