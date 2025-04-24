const express = require('express');
const router = express.Router();
const {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceByClass,
  getAttendanceByDateRange,
  getAttendanceByDate,
  getAttendanceByStudent,
  getAttendanceStatsByClass,
  getAttendanceStatsByDateRange,
  updateStudentAttendance
} = require('../controllers/attendanceController');

// Import auth middleware
const { protect, authorize } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

// Special routes that need to be defined before /:id routes
router.get('/class/:classId', getAttendanceByClass);
router.get('/date-range', getAttendanceByDateRange);
router.get('/date', getAttendanceByDate);
router.get('/student/:studentId', getAttendanceByStudent);
router.get('/stats/class/:classId', getAttendanceStatsByClass);
router.get('/stats/date-range', getAttendanceStatsByDateRange);

// Base routes
router.route('/')
  .get(getAllAttendance)
  .post(createAttendance);

router.route('/:id')
  .get(getAttendanceById)
  .put(updateAttendance)
  .delete(deleteAttendance);

// Update single student attendance
router.patch('/:id/student/:studentId', updateStudentAttendance);

module.exports = router;