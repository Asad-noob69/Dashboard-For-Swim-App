import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Parent reference is required'],
    },
    enrolledClasses: [
      {
        class: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Class',
        },
        status: {
          type: String,
          enum: ['active', 'completed', 'dropped'],
          default: 'active',
        },
        enrolledDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'competitive'],
      default: 'beginner',
    },
    progress: [
      {
        skill: {
          type: String,
          required: true,
        },
        level: {
          type: Number,
          min: 1,
          max: 10,
          default: 1,
        },
        achievedOn: {
          type: Date,
          default: Date.now,
        },
        notes: String,
        awardedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    badges: [
      {
        name: {
          type: String,
          required: true,
        },
        description: String,
        awardedOn: {
          type: Date,
          default: Date.now,
        },
        awardedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    medicalInfo: {
      conditions: [String],
      allergies: [String],
      notes: String,
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
    notes: String,
    photo: {
      type: String,
      default: 'default-student.png',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual property to calculate current age
StudentSchema.virtual('currentAge').get(function () {
  return Math.floor((new Date() - this.dateOfBirth) / (365.25 * 24 * 60 * 60 * 1000));
});

// Virtual to get most recent skill achievements
StudentSchema.virtual('recentAchievements').get(function () {
  return this.progress
    .sort((a, b) => b.achievedOn - a.achievedOn)
    .slice(0, 5);
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;