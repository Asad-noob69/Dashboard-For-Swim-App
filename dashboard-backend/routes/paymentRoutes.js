const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Import controller
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentsByStudent,
  getPaymentsByParent,
  getPaymentsByClass,
  getPaymentsByDate,
  getPaymentsStatistics
} = require('../controllers/paymentController');

// Protect all routes
router.use(protect);

// Special routes
router.get('/student/:studentId', getPaymentsByStudent);
router.get('/parent/:parentId', getPaymentsByParent);
router.get('/class/:classId', getPaymentsByClass);
router.get('/date', getPaymentsByDate);
router.get('/statistics', getPaymentsStatistics);

// Base routes
router.route('/')
  .get(getAllPayments)
  .post(authorize('admin'), createPayment);

router.route('/:id')
  .get(getPaymentById)
  .put(authorize('admin'), updatePayment)
  .delete(authorize('admin'), deletePayment);

module.exports = router;