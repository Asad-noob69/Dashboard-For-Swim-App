import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class reference is required'],
    },
    date: {
      type: Date,
      required: [true, 'Attendance date is required'],
      default: Date.now,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
          required: true,
        },
        status: {
          type: String,
          enum: ['present', 'absent', 'late', 'excused'],
          default: 'absent',
        },
        arrivalTime: Date,
        departureTime: Date,
        reason: String,
      },
    ],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Instructor reference is required'],
    },
    notes: String,
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to calculate attendance statistics
AttendanceSchema.virtual('stats').get(function () {
  const total = this.students.length;
  const present = this.students.filter(s => s.status === 'present').length;
  const absent = this.students.filter(s => s.status === 'absent').length;
  const late = this.students.filter(s => s.status === 'late').length;
  const excused = this.students.filter(s => s.status === 'excused').length;
  
  return {
    total,
    present,
    absent,
    late,
    excused,
    presentPercentage: total > 0 ? Math.round((present / total) * 100) : 0,
    absentPercentage: total > 0 ? Math.round((absent / total) * 100) : 0,
  };
});

// Compound index for faster lookups
AttendanceSchema.index({ class: 1, date: 1 });

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;