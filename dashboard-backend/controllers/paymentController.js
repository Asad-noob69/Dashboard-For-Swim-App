const Payment = require('../models/Payment');
const User = require('../models/User');
const Student = require('../models/Student');
const Class = require('../models/Class');

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private (Admin)
exports.getAllPayments = async (req, res, next) => {
  try {
    // Regular users can only see their own payments
    let query = {};
    
    if (req.user.role !== 'admin') {
      query.parent = req.user.id;
    }
    
    const payments = await Payment.find(query)
      .populate('student', 'name')
      .populate('class', 'name')
      .populate('parent', 'name email');
    
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private
exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('student', 'name')
      .populate('class', 'name')
      .populate('parent', 'name email');
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    
    // Check if user is authorized to view this payment
    if (
      req.user.role !== 'admin' && 
      payment.parent && 
      payment.parent._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view this payment'
      });
    }
    
    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new payment
// @route   POST /api/payments
// @access  Private (Admin)
exports.createPayment = async (req, res, next) => {
  try {
    // Check if student exists
    if (req.body.student) {
      const student = await Student.findById(req.body.student);
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Student not found'
        });
      }
    }
    
    // Check if class exists
    if (req.body.class) {
      const classObj = await Class.findById(req.body.class);
      if (!classObj) {
        return res.status(404).json({
          success: false,
          error: 'Class not found'
        });
      }
    }
    
    // Check if parent exists
    if (req.body.parent) {
      const parent = await User.findById(req.body.parent);
      if (!parent) {
        return res.status(404).json({
          success: false,
          error: 'Parent user not found'
        });
      }
    }
    
    // Create payment
    const payment = await Payment.create(req.body);
    
    // Return populated payment
    const populatedPayment = await Payment.findById(payment._id)
      .populate('student', 'name')
      .populate('class', 'name')
      .populate('parent', 'name email');
    
    res.status(201).json(populatedPayment);
  } catch (error) {
    next(error);
  }
};

// @desc    Update payment
// @route   PUT /api/payments/:id
// @access  Private (Admin)
exports.updatePayment = async (req, res, next) => {
  try {
    let payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    
    // Check if student exists
    if (req.body.student) {
      const student = await Student.findById(req.body.student);
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Student not found'
        });
      }
    }
    
    // Check if class exists
    if (req.body.class) {
      const classObj = await Class.findById(req.body.class);
      if (!classObj) {
        return res.status(404).json({
          success: false,
          error: 'Class not found'
        });
      }
    }
    
    // Check if parent exists
    if (req.body.parent) {
      const parent = await User.findById(req.body.parent);
      if (!parent) {
        return res.status(404).json({
          success: false,
          error: 'Parent user not found'
        });
      }
    }
    
    // Update payment
    payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('student', 'name')
      .populate('class', 'name')
      .populate('parent', 'name email');
    
    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete payment
// @route   DELETE /api/payments/:id
// @access  Private (Admin)
exports.deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    
    await payment.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payments by student ID
// @route   GET /api/payments/student/:studentId
// @access  Private
exports.getPaymentsByStudent = async (req, res, next) => {
  try {
    // Check if student exists
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    // Check authorization
    if (
      req.user.role !== 'admin' && 
      student.parentId && 
      student.parentId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view these payments'
      });
    }
    
    // Get payments for student
    const payments = await Payment.find({ student: req.params.studentId })
      .populate('class', 'name')
      .populate('parent', 'name email');
    
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get payments by parent ID
// @route   GET /api/payments/parent/:parentId
// @access  Private (Admin or Parent)
exports.getPaymentsByParent = async (req, res, next) => {
  try {
    // Check authorization
    if (req.user.role !== 'admin' && req.params.parentId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view these payments'
      });
    }
    
    // Get payments for parent
    const payments = await Payment.find({ parent: req.params.parentId })
      .populate('student', 'name')
      .populate('class', 'name');
    
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get payments by class ID
// @route   GET /api/payments/class/:classId
// @access  Private (Admin)
exports.getPaymentsByClass = async (req, res, next) => {
  try {
    // Only admin can see payments by class
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view these payments'
      });
    }
    
    // Check if class exists
    const classObj = await Class.findById(req.params.classId);
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    // Get payments for class
    const payments = await Payment.find({ class: req.params.classId })
      .populate('student', 'name')
      .populate('parent', 'name email');
    
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get payments by date range
// @route   GET /api/payments/date
// @access  Private (Admin or filtered by user)
exports.getPaymentsByDate = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Please provide start and end dates'
      });
    }
    
    // Build query
    const query = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };
    
    // Filter by parent if not admin
    if (req.user.role !== 'admin') {
      query.parent = req.user.id;
    }
    
    // Get payments in date range
    const payments = await Payment.find(query)
      .populate('student', 'name')
      .populate('class', 'name')
      .populate('parent', 'name email');
    
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment statistics
// @route   GET /api/payments/statistics
// @access  Private (Admin)
exports.getPaymentsStatistics = async (req, res, next) => {
  try {
    // Only admin can see payment statistics
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view payment statistics'
      });
    }
    
    const { startDate, endDate } = req.query;
    
    // Build query
    const query = {};
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    // Calculate statistics
    const totalPayments = await Payment.countDocuments(query);
    
    // Get total amount
    const totalResult = await Payment.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalAmount = totalResult.length > 0 ? totalResult[0].total : 0;
    
    // Get payment method breakdown
    const paymentMethodStats = await Payment.aggregate([
      { $match: query },
      { $group: { _id: '$paymentMethod', count: { $sum: 1 }, amount: { $sum: '$amount' } } }
    ]);
    
    // Get payment status breakdown
    const paymentStatusStats = await Payment.aggregate([
      { $match: query },
      { $group: { _id: '$status', count: { $sum: 1 }, amount: { $sum: '$amount' } } }
    ]);
    
    // Format response
    const statistics = {
      totalPayments,
      totalAmount,
      paymentMethods: paymentMethodStats.map(stat => ({
        method: stat._id,
        count: stat.count,
        amount: stat.amount,
        percentage: (stat.count / totalPayments) * 100
      })),
      paymentStatus: paymentStatusStats.map(stat => ({
        status: stat._id,
        count: stat.count,
        amount: stat.amount,
        percentage: (stat.count / totalPayments) * 100
      })),
      dateRange: startDate && endDate ? { startDate, endDate } : null
    };
    
    res.status(200).json(statistics);
  } catch (error) {
    next(error);
  }
};