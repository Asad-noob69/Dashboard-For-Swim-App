const Attendance = require('../models/Attendance');
const Class = require('../models/Class');
const Student = require('../models/Student');

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private
exports.getAllAttendance = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find()
      .populate('classId', 'name')
      .populate('instructor', 'name photo')
      .populate('students.student', 'name photo');
    
    res.status(200).json(attendanceRecords);
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance record by ID
// @route   GET /api/attendance/:id
// @access  Private
exports.getAttendanceById = async (req, res, next) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('classId', 'name')
      .populate('instructor', 'name photo')
      .populate('students.student', 'name photo');
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        error: 'Attendance record not found'
      });
    }
    
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new attendance record
// @route   POST /api/attendance
// @access  Private (Admin or Instructor)
exports.createAttendance = async (req, res, next) => {
  try {
    // Check if class exists
    const classObj = await Class.findById(req.body.classId);
    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }
    
    // Calculate statistics
    let total = 0;
    let present = 0;
    let absent = 0;
    let late = 0;
    let excused = 0;
    
    if (req.body.students && Array.isArray(req.body.students)) {
      total = req.body.students.length;
      
      req.body.students.forEach(student => {
        switch (student.status) {
          case 'present':
            present++;
            break;
          case 'absent':
            absent++;
            break;
          case 'late':
            late++;
            break;
          case 'excused':
            excused++;
            break;
          default:
            break;
        }
      });
    }
    
    // Calculate percentages
    const presentPercentage = total > 0 ? (present / total) * 100 : 0;
    const absentPercentage = total > 0 ? (absent / total) * 100 : 0;
    const latePercentage = total > 0 ? (late / total) * 100 : 0;
    const excusedPercentage = total > 0 ? (excused / total) * 100 : 0;
    
    // Create stats object
    const stats = {
      total,
      present,
      absent,
      late,
      excused,
      presentPercentage,
      absentPercentage,
      latePercentage,
      excusedPercentage
    };
    
    // Add stats to request body
    req.body.stats = stats;
    
    // Add submittedBy if not provided
    if (!req.body.submittedBy && req.user) {
      req.body.submittedBy = req.user.id;
    }
    
    // Create attendance record
    const attendance = await Attendance.create(req.body);
    
    // Return populated record
    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate('classId', 'name')
      .populate('instructor', 'name photo')
      .populate('students.student', 'name photo');
    
    res.status(201).json(populatedAttendance);
  } catch (error) {
    next(error);
  }
};

// @desc    Update attendance record
// @route   PUT /api/attendance/:id
// @access  Private (Admin or Instructor)
exports.updateAttendance = async (req, res, next) => {
  try {
    let attendance = await Attendance.findById(req.params.id);
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        error: 'Attendance record not found'
      });
    }
    
    // Recalculate stats if students array is being updated
    if (req.body.students && Array.isArray(req.body.students)) {
      let total = req.body.students.length;
      let present = 0;
      let absent = 0;
      let late = 0;
      let excused = 0;
      
      req.body.students.forEach(student => {
        switch (student.status) {
          case 'present':
            present++;
            break;
          case 'absent':
            absent++;
            break;
          case 'late':
            late++;
            break;
          case 'excused':
            excused++;
            break;
          default:
            break;
        }
      });
      
      // Calculate percentages
      const presentPercentage = total > 0 ? (present / total) * 100 : 0;
      const absentPercentage = total > 0 ? (absent / total) * 100 : 0;
      const latePercentage = total > 0 ? (late / total) * 100 : 0;
      const excusedPercentage = total > 0 ? (excused / total) * 100 : 0;
      
      // Create stats object
      req.body.stats = {
        total,
        present,
        absent,
        late,
        excused,
        presentPercentage,
        absentPercentage,
        latePercentage,
        excusedPercentage
      };
    }
    
    // Update attendance
    attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('classId', 'name')
      .populate('instructor', 'name photo')
      .populate('students.student', 'name photo');
    
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private (Admin only)
exports.deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        error: 'Attendance record not found'
      });
    }
    
    await attendance.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance by class ID
// @route   GET /api/attendance/class/:classId
// @access  Private
exports.getAttendanceByClass = async (req, res, next) => {
  try {
    const attendance = await Attendance.find({ classId: req.params.classId })
      .populate('classId', 'name')
      .populate('instructor', 'name photo')
      .populate('students.student', 'name photo');
    
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance by date range
// @route   GET /api/attendance/date-range
// @access  Private
exports.getAttendanceByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Please provide start and end dates'
      });
    }
    
    const attendance = await Attendance.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('classId', 'name')
      .populate('instructor', 'name photo')
      .populate('students.student', 'name photo');
    
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance for a specific date
// @route   GET /api/attendance/date
// @access  Private
exports.getAttendanceByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a date'
      });
    }
    
    // Create date range for the entire day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const attendance = await Attendance.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate('classId', 'name')
      .populate('instructor', 'name photo')
      .populate('students.student', 'name photo');
    
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance for a student by ID
// @route   GET /api/attendance/student/:studentId
// @access  Private
exports.getAttendanceByStudent = async (req, res, next) => {
  try {
    const attendance = await Attendance.find({
      'students.student': req.params.studentId
    }).populate('classId', 'name')
      .populate('instructor', 'name photo');
    
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance statistics by class
// @route   GET /api/attendance/stats/class/:classId
// @access  Private
exports.getAttendanceStatsByClass = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find({ classId: req.params.classId });
    
    if (attendanceRecords.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
          presentPercentage: 0,
          absentPercentage: 0,
          latePercentage: 0,
          excusedPercentage: 0,
          recordsCount: 0
        }
      });
    }
    
    // Aggregate stats
    let total = 0;
    let present = 0;
    let absent = 0;
    let late = 0;
    let excused = 0;
    
    attendanceRecords.forEach(record => {
      if (record.stats) {
        total += record.stats.total || 0;
        present += record.stats.present || 0;
        absent += record.stats.absent || 0;
        late += record.stats.late || 0;
        excused += record.stats.excused || 0;
      }
    });
    
    // Calculate percentages
    const presentPercentage = total > 0 ? (present / total) * 100 : 0;
    const absentPercentage = total > 0 ? (absent / total) * 100 : 0;
    const latePercentage = total > 0 ? (late / total) * 100 : 0;
    const excusedPercentage = total > 0 ? (excused / total) * 100 : 0;
    
    // Response
    res.status(200).json({
      success: true,
      data: {
        total,
        present,
        absent,
        late,
        excused,
        presentPercentage,
        absentPercentage,
        latePercentage,
        excusedPercentage,
        recordsCount: attendanceRecords.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance statistics by date range
// @route   GET /api/attendance/stats/date-range
// @access  Private
exports.getAttendanceStatsByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Please provide start and end dates'
      });
    }
    
    const attendanceRecords = await Attendance.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });
    
    if (attendanceRecords.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
          presentPercentage: 0,
          absentPercentage: 0,
          latePercentage: 0,
          excusedPercentage: 0,
          recordsCount: 0
        }
      });
    }
    
    // Aggregate stats
    let total = 0;
    let present = 0;
    let absent = 0;
    let late = 0;
    let excused = 0;
    
    attendanceRecords.forEach(record => {
      if (record.stats) {
        total += record.stats.total || 0;
        present += record.stats.present || 0;
        absent += record.stats.absent || 0;
        late += record.stats.late || 0;
        excused += record.stats.excused || 0;
      }
    });
    
    // Calculate percentages
    const presentPercentage = total > 0 ? (present / total) * 100 : 0;
    const absentPercentage = total > 0 ? (absent / total) * 100 : 0;
    const latePercentage = total > 0 ? (late / total) * 100 : 0;
    const excusedPercentage = total > 0 ? (excused / total) * 100 : 0;
    
    // Response
    res.status(200).json({
      success: true,
      data: {
        total,
        present,
        absent,
        late,
        excused,
        presentPercentage,
        absentPercentage,
        latePercentage,
        excusedPercentage,
        recordsCount: attendanceRecords.length,
        dateRange: {
          startDate,
          endDate
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a single student's attendance status
// @route   PATCH /api/attendance/:id/student/:studentId
// @access  Private
exports.updateStudentAttendance = async (req, res, next) => {
  try {
    const { id, studentId } = req.params;
    const { status, arrivalTime, departureTime, reason } = req.body;
    
    // Validate status
    if (!['present', 'absent', 'late', 'excused'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }
    
    // Find attendance record
    const attendance = await Attendance.findById(id);
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        error: 'Attendance record not found'
      });
    }
    
    // Find student in the record
    const studentIndex = attendance.students.findIndex(
      s => s.student.toString() === studentId
    );
    
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Student not found in the attendance record'
      });
    }
    
    // Update student's attendance
    attendance.students[studentIndex].status = status;
    if (arrivalTime) attendance.students[studentIndex].arrivalTime = arrivalTime;
    if (departureTime) attendance.students[studentIndex].departureTime = departureTime;
    if (reason) attendance.students[studentIndex].reason = reason;
    
    // Recalculate stats
    let total = attendance.students.length;
    let present = 0;
    let absent = 0;
    let late = 0;
    let excused = 0;
    
    attendance.students.forEach(student => {
      switch (student.status) {
        case 'present':
          present++;
          break;
        case 'absent':
          absent++;
          break;
        case 'late':
          late++;
          break;
        case 'excused':
          excused++;
          break;
        default:
          break;
      }
    });
    
    // Calculate percentages
    const presentPercentage = total > 0 ? (present / total) * 100 : 0;
    const absentPercentage = total > 0 ? (absent / total) * 100 : 0;
    const latePercentage = total > 0 ? (late / total) * 100 : 0;
    const excusedPercentage = total > 0 ? (excused / total) * 100 : 0;
    
    // Update stats
    attendance.stats = {
      total,
      present,
      absent,
      late,
      excused,
      presentPercentage,
      absentPercentage,
      latePercentage,
      excusedPercentage
    };
    
    // Save changes
    await attendance.save();
    
    // Return updated record
    const updatedAttendance = await Attendance.findById(id)
      .populate('classId', 'name')
      .populate('instructor', 'name photo')
      .populate('students.student', 'name photo');
    
    res.status(200).json(updatedAttendance);
  } catch (error) {
    next(error);
  }
};