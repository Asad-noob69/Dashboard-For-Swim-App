const Student = require('../models/Student');
const User = require('../models/User');
const Class = require('../models/Class');
const path = require('path');
const fs = require('fs');

// @desc    Get all students
// @route   GET /api/students
// @access  Private
exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find()
      .populate('parentId', 'name email')
      .populate('enrolledClasses.id', 'name instructor schedule');
    
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('parentId', 'name email')
      .populate('enrolledClasses.id', 'name instructor schedule');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Private
exports.createStudent = async (req, res, next) => {
  try {
    // Check if parentId exists
    if (req.body.parentId) {
      const parentExists = await User.findById(req.body.parentId);
      if (!parentExists) {
        return res.status(400).json({
          success: false,
          error: 'Parent user does not exist'
        });
      }
    }
    
    // Create student
    const student = await Student.create(req.body);
    
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    // Check if parentId exists if it's being updated
    if (req.body.parentId) {
      const parentExists = await User.findById(req.body.parentId);
      if (!parentExists) {
        return res.status(400).json({
          success: false,
          error: 'Parent user does not exist'
        });
      }
    }
    
    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('parentId', 'name email')
     .populate('enrolledClasses.id', 'name instructor schedule');
    
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    // If student has a photo, delete it
    if (student.photo && !student.photo.includes('default')) {
      const photoPath = path.join(__dirname, '../uploads', student.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }
    
    await student.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get students by parent ID
// @route   GET /api/students/parent/:parentId
// @access  Private
exports.getStudentsByParent = async (req, res, next) => {
  try {
    const students = await Student.find({ parentId: req.params.parentId })
      .populate('enrolledClasses.id', 'name instructor schedule');
    
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// @desc    Get students by class ID
// @route   GET /api/students/class/:classId
// @access  Private
exports.getStudentsByClass = async (req, res, next) => {
  try {
    const students = await Student.find({
      'enrolledClasses.id': req.params.classId
    }).populate('parentId', 'name email');
    
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// @desc    Update student progress
// @route   POST /api/students/:id/progress
// @access  Private
exports.updateStudentProgress = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    // Add new progress entry
    const { skill, level, achievedOn } = req.body;
    
    student.progress.push({
      skill,
      level,
      achievedOn: achievedOn || new Date()
    });
    
    await student.save();
    
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

// @desc    Upload student photo
// @route   POST /api/students/:id/photo
// @access  Private
exports.uploadStudentPhoto = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
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
    file.name = `photo_${student._id}${path.parse(file.name).ext}`;
    
    // Delete old photo if exists
    if (student.photo && !student.photo.includes('default')) {
      const oldPath = path.join(__dirname, '../uploads', student.photo);
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
      await Student.findByIdAndUpdate(req.params.id, { photo: file.name });
      
      res.status(200).json({
        success: true,
        photoUrl: file.name
      });
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enroll student in class
// @route   POST /api/students/:id/enroll
// @access  Private
exports.enrollStudentInClass = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    const classObj = await Class.findById(req.body.classId);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    // Check if already enrolled
    const alreadyEnrolled = student.enrolledClasses.some(
      (enrolledClass) => enrolledClass.id.toString() === req.body.classId
    );
    
    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        error: 'Student already enrolled in this class'
      });
    }
    
    // Add class to student
    student.enrolledClasses.push({
      id: req.body.classId,
      name: classObj.name,
      status: 'active'
    });
    
    await student.save();
    
    // Add student to class
    classObj.students.push(req.params.id);
    await classObj.save();
    
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove student from class
// @route   POST /api/students/:id/unenroll
// @access  Private
exports.removeStudentFromClass = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    const classObj = await Class.findById(req.body.classId);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    // Remove class from student
    student.enrolledClasses = student.enrolledClasses.filter(
      (enrolledClass) => enrolledClass.id.toString() !== req.body.classId
    );
    
    await student.save();
    
    // Remove student from class
    classObj.students = classObj.students.filter(
      (studentId) => studentId.toString() !== req.params.id
    );
    
    await classObj.save();
    
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};