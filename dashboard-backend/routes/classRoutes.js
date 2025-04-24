const express = require('express');
const router = express.Router();
const {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getClassesByInstructor,
  getClassesByTimePeriod,
  getClassesByDay,
  getActiveClasses,
  addToWaitlist,
  removeFromWaitlist,
  getWaitlist,
  cancelClass,
  completeClass
} = require('../controllers/classController');

// Import auth middleware
const { protect, authorize } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

// Special routes that need to be defined before /:id routes to avoid conflicts
router.get('/instructor/:instructorId', getClassesByInstructor);
router.get('/schedule', getClassesByTimePeriod);
router.get('/day', getClassesByDay);
router.get('/active', getActiveClasses);

// Base routes
router.route('/')
  .get(getAllClasses)
  .post(createClass);

router.route('/:id')
  .get(getClassById)
  .put(updateClass)
  .delete(deleteClass);

// Waitlist routes
router.route('/:id/waitlist')
  .get(getWaitlist)
  .post(addToWaitlist);

router.delete('/:id/waitlist/:studentId', removeFromWaitlist);

// Status change routes
router.post('/:id/cancel', cancelClass);
router.post('/:id/complete', completeClass);

module.exports = router;