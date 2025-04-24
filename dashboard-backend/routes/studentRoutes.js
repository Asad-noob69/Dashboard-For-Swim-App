const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByParent,
  getStudentsByClass,
  updateStudentProgress,
  uploadStudentPhoto,
  enrollStudentInClass,
  removeStudentFromClass
} = require('../controllers/studentController');

// Import auth middleware
const { protect, authorize } = require('../middleware/authMiddleware');

// Use auth middleware for all routes
router.use(protect);

// Base routes
router.route('/')
  .get(getAllStudents)
  .post(createStudent);

router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

// Special routes
router.get('/parent/:parentId', getStudentsByParent);
router.get('/class/:classId', getStudentsByClass);
router.post('/:id/progress', updateStudentProgress);
router.post('/:id/photo', uploadStudentPhoto);
router.post('/:id/enroll', enrollStudentInClass);
router.post('/:id/unenroll', removeStudentFromClass);

module.exports = router;