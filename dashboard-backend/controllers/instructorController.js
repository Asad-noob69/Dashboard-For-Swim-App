const Instructor = require('../models/Instructor');
const Class = require('../models/Class');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get all instructors
// @route   GET /api/instructors
// @access  Private
exports.getAllInstructors = async (req, res, next) => {
  try {
    const instructors = await Instructor.find()
      .populate('userId', 'name email');
    
    res.status(200).json(instructors);
  } catch (error) {
    next(error);
  }
};

// @desc    Get instructor by ID
// @route   GET /api/instructors/:id
// @access  Private
exports.getInstructorById = async (req, res, next) => {
  try {
    const instructor = await Instructor.findById(req.params.id)
      .populate('userId', 'name email');
    
    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: 'Instructor not found'
      });
    }
    
    res.status(200).json(instructor);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new instructor
// @route   POST /api/instructors
// @access  Private (Admin)
exports.createInstructor = async (req, res, next) => {
  try {
    // Check if userId exists and has role 'instructor'
    if (req.body.userId) {
      const user = await User.findById(req.body.userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      // Update user role to instructor if not already
      if (user.role !== 'instructor') {
        await User.findByIdAndUpdate(req.body.userId, { role: 'instructor' });
      }
    }
    
    // Create instructor
    const instructor = await Instructor.create(req.body);
    
    // Return populated instructor
    const populatedInstructor = await Instructor.findById(instructor._id)
      .populate('userId', 'name email');
    
    res.status(201).json(populatedInstructor);
  } catch (error) {
    next(error);
  }
};

// @desc    Update instructor
// @route   PUT /api/instructors/:id
// @access  Private (Admin or Instructor)
exports.updateInstructor = async (req, res, next) => {
  try {
    let instructor = await Instructor.findById(req.params.id);
    
    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: 'Instructor not found'
      });
    }
    
    // Check if user is the instructor or admin
    if (
      req.user.role !== 'admin' && 
      instructor.userId && 
      instructor.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this instructor'
      });
    }
    
    // Update instructor
    instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');
    
    res.status(200).json(instructor);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete instructor
// @route   DELETE /api/instructors/:id
// @access  Private (Admin)
exports.deleteInstructor = async (req, res, next) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    
    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: 'Instructor not found'
      });
    }
    
    // Check if instructor has classes
    const hasClasses = await Class.exists({ instructor: req.params.id });
    
    if (hasClasses) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete instructor with assigned classes'
      });
    }
    
    // If instructor has a photo, delete it
    if (instructor.photo && !instructor.photo.includes('default')) {
      const photoPath = path.join(__dirname, '../uploads', instructor.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }
    
    await instructor.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get instructor's schedule
// @route   GET /api/instructors/:id/schedule
// @access  Private
exports.getInstructorSchedule = async (req, res, next) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    
    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: 'Instructor not found'
      });
    }
    
    // Get all classes taught by the instructor
    const classes = await Class.find({ instructor: req.params.id })
      .select('name schedule status');
    
    // Extract schedule information
    const schedule = classes.flatMap(classObj => {
      return classObj.schedule.map(scheduleItem => {
        return {
          classId: classObj._id,
          className: classObj.name,
          status: classObj.status,
          day: scheduleItem.day,
          startTime: scheduleItem.startTime,
          endTime: scheduleItem.endTime,
          pool: scheduleItem.pool,
          recurrence: scheduleItem.recurrence
        };
      });
    });
    
    res.status(200).json(schedule);
  } catch (error) {
    next(error);
  }
};

// @desc    Get instructor's classes
// @route   GET /api/instructors/:id/classes
// @access  Private
exports.getInstructorClasses = async (req, res, next) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    
    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: 'Instructor not found'
      });
    }
    
    // Get all classes taught by the instructor
    const classes = await Class.find({ instructor: req.params.id })
      .populate('students', 'name');
    
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};

// @desc    Upload instructor photo
// @route   POST /api/instructors/:id/photo
// @access  Private (Admin or Instructor)
exports.uploadInstructorPhoto = async (req, res, next) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    
    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: 'Instructor not found'
      });
    }
    
    // Check if user is the instructor or admin
    if (
      req.user.role !== 'admin' && 
      instructor.userId && 
      instructor.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this instructor'
      });
    }
    
    if (!req.files || !req.files.photo) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a photo'
      });
    }
    
    const file = req.files.photo;
    
    // Check file type
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image file'
      });
    }
    
    // Check file size
    if (file.size > 1000000) { // 1MB
      return res.status(400).json({
        success: false,
        error: 'Image should be less than 1MB'
      });
    }
    
    // Create custom filename
    file.name = `photo_instructor_${instructor._id}${path.parse(file.name).ext}`;
    
    // Delete old photo if exists
    if (instructor.photo && !instructor.photo.includes('default')) {
      const oldPath = path.join(__dirname, '../uploads', instructor.photo);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    
    // Move file to upload path
    file.mv(path.join(__dirname, '../uploads', file.name), async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: 'Problem with file upload'
        });
      }
      
      // Update database
      await Instructor.findByIdAndUpdate(req.params.id, { photo: file.name });
      
      res.status(200).json({
        success: true,
        photoUrl: file.name
      });
    });
  } catch (error) {
    next(error);
  }
};