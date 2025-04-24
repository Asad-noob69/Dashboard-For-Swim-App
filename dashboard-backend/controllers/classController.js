const Class = require('../models/Class');
const Instructor = require('../models/Instructor');
const Student = require('../models/Student');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private
exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find()
      .populate('instructor', 'name photo')
      .populate('students', 'name');
    
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get class by ID
// @route   GET /api/classes/:id
// @access  Private
exports.getClassById = async (req, res, next) => {
  try {
    const classObj = await Class.findById(req.params.id)
      .populate('instructor', 'name photo')
      .populate('students', 'name');
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    res.status(200).json(classObj);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new class
// @route   POST /api/classes
// @access  Private (Admin or Instructor)
exports.createClass = async (req, res, next) => {
  try {
    // Check if instructor exists if provided
    if (req.body.instructor) {
      const instructorExists = await Instructor.findById(req.body.instructor);
      if (!instructorExists) {
        return res.status(400).json({
          success: false,
          error: 'Instructor does not exist'
        });
      }
    }
    
    // Create class
    const classObj = await Class.create(req.body);
    
    // Populate instructor and return response
    const populatedClass = await Class.findById(classObj._id)
      .populate('instructor', 'name photo');
    
    res.status(201).json(populatedClass);
  } catch (error) {
    next(error);
  }
};

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private (Admin or Instructor)
exports.updateClass = async (req, res, next) => {
  try {
    let classObj = await Class.findById(req.params.id);
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    // Check if instructor exists if it's being updated
    if (req.body.instructor) {
      const instructorExists = await Instructor.findById(req.body.instructor);
      if (!instructorExists) {
        return res.status(400).json({
          success: false,
          error: 'Instructor does not exist'
        });
      }
    }
    
    // Update class
    classObj = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('instructor', 'name photo')
      .populate('students', 'name');
    
    res.status(200).json(classObj);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private (Admin only)
exports.deleteClass = async (req, res, next) => {
  try {
    const classObj = await Class.findById(req.params.id);
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    // Check if there are students enrolled
    if (classObj.students && classObj.students.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete class with enrolled students'
      });
    }
    
    await classObj.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get classes by instructor ID
// @route   GET /api/classes/instructor/:instructorId
// @access  Private
exports.getClassesByInstructor = async (req, res, next) => {
  try {
    const classes = await Class.find({ instructor: req.params.instructorId })
      .populate('instructor', 'name photo')
      .populate('students', 'name');
    
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get classes by time period
// @route   GET /api/classes/schedule
// @access  Private
exports.getClassesByTimePeriod = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Create date range filter
    const filter = {};
    if (startDate) filter.startDate = { $gte: new Date(startDate) };
    if (endDate) filter.endDate = { $lte: new Date(endDate) };
    
    const classes = await Class.find(filter)
      .populate('instructor', 'name photo')
      .populate('students', 'name');
    
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get classes by day of week
// @route   GET /api/classes/day
// @access  Private
exports.getClassesByDay = async (req, res, next) => {
  try {
    const { day } = req.query;
    
    if (!day) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a day of the week'
      });
    }
    
    const classes = await Class.find({
      'schedule.day': day
    }).populate('instructor', 'name photo')
      .populate('students', 'name');
    
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get active classes
// @route   GET /api/classes/active
// @access  Private
exports.getActiveClasses = async (req, res, next) => {
  try {
    const classes = await Class.find({ status: 'active' })
      .populate('instructor', 'name photo')
      .populate('students', 'name');
    
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};

// @desc    Add student to class waitlist
// @route   POST /api/classes/:id/waitlist
// @access  Private
exports.addToWaitlist = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    const classId = req.params.id;
    
    // Validate inputs
    if (!studentId) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a student ID'
      });
    }
    
    const classObj = await Class.findById(classId);
    const student = await Student.findById(studentId);
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    // Check if class is full
    if (classObj.students.length < classObj.capacity) {
      return res.status(400).json({
        success: false,
        error: 'Class is not full, student can be enrolled directly'
      });
    }
    
    // Check if student is already in waitlist
    const alreadyInWaitlist = classObj.waitlist && classObj.waitlist.some(
      item => item.student.toString() === studentId
    );
    
    if (alreadyInWaitlist) {
      return res.status(400).json({
        success: false,
        error: 'Student is already on the waitlist'
      });
    }
    
    // Add student to waitlist
    if (!classObj.waitlist) {
      classObj.waitlist = [];
    }
    
    const position = classObj.waitlist.length + 1;
    
    classObj.waitlist.push({
      student: studentId,
      joinedAt: new Date(),
      position
    });
    
    await classObj.save();
    
    // Return updated class
    const updatedClass = await Class.findById(classId)
      .populate('instructor', 'name photo')
      .populate('waitlist.student', 'name');
    
    res.status(200).json(updatedClass);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove student from class waitlist
// @route   DELETE /api/classes/:id/waitlist/:studentId
// @access  Private
exports.removeFromWaitlist = async (req, res, next) => {
  try {
    const { id: classId, studentId } = req.params;
    
    const classObj = await Class.findById(classId);
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    // Check if student is in waitlist
    if (!classObj.waitlist || !classObj.waitlist.some(item => item.student.toString() === studentId)) {
      return res.status(400).json({
        success: false,
        error: 'Student is not on the waitlist'
      });
    }
    
    // Remove student from waitlist
    classObj.waitlist = classObj.waitlist.filter(item => item.student.toString() !== studentId);
    
    // Update positions for remaining students
    if (classObj.waitlist.length > 0) {
      classObj.waitlist = classObj.waitlist.map((item, index) => {
        item.position = index + 1;
        return item;
      });
    }
    
    await classObj.save();
    
    // Return updated class
    const updatedClass = await Class.findById(classId)
      .populate('instructor', 'name photo')
      .populate('waitlist.student', 'name');
    
    res.status(200).json(updatedClass);
  } catch (error) {
    next(error);
  }
};

// @desc    Get class waitlist
// @route   GET /api/classes/:id/waitlist
// @access  Private
exports.getWaitlist = async (req, res, next) => {
  try {
    const classObj = await Class.findById(req.params.id)
      .populate('waitlist.student', 'name');
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    const waitlist = classObj.waitlist || [];
    
    res.status(200).json(waitlist);
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel class
// @route   POST /api/classes/:id/cancel
// @access  Private (Admin or Instructor)
exports.cancelClass = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const classId = req.params.id;
    
    const classObj = await Class.findById(classId);
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    // Update class status
    classObj.status = 'cancelled';
    if (reason) {
      classObj.cancelReason = reason;
    }
    
    await classObj.save();
    
    // Return updated class
    const updatedClass = await Class.findById(classId)
      .populate('instructor', 'name photo')
      .populate('students', 'name');
    
    res.status(200).json(updatedClass);
  } catch (error) {
    next(error);
  }
};

// @desc    Complete class
// @route   POST /api/classes/:id/complete
// @access  Private (Admin or Instructor)
exports.completeClass = async (req, res, next) => {
  try {
    const classId = req.params.id;
    
    const classObj = await Class.findById(classId);
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    // Update class status
    classObj.status = 'completed';
    
    await classObj.save();
    
    // Return updated class
    const updatedClass = await Class.findById(classId)
      .populate('instructor', 'name photo')
      .populate('students', 'name');
    
    res.status(200).json(updatedClass);
  } catch (error) {
    next(error);
  }
};