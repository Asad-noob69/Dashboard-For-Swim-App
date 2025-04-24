const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Import controller (we'll create this next)
const {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
  getInstructorSchedule,
  getInstructorClasses,
  uploadInstructorPhoto
} = require('../controllers/instructorController');

// Protect all routes
router.use(protect);

// Special routes
router.get('/:id/schedule', getInstructorSchedule);
router.get('/:id/classes', getInstructorClasses);
router.post('/:id/photo', uploadInstructorPhoto);

// Base routes
router.route('/')
  .get(getAllInstructors)
  .post(authorize('admin'), createInstructor);

router.route('/:id')
  .get(getInstructorById)
  .put(authorize('admin', 'instructor'), updateInstructor)
  .delete(authorize('admin'), deleteInstructor);

module.exports = router;