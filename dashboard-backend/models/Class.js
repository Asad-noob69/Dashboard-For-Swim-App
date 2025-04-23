import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Class title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    ageGroup: {
      type: String,
      enum: ['toddler', 'preschool', 'elementary', 'preteen', 'teen', 'adult'],
      required: [true, 'Age group is required']
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'competitive'],
      required: [true, 'Level is required']
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Instructor is required']
    },
    schedule: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      recurrence: {
        type: String,
        enum: ['weekly', 'biweekly', 'monthly', 'once'],
        default: 'weekly'
      }
    }],
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    capacity: {
      type: Number,
      required: [true, 'Class capacity is required'],
      min: [1, 'Capacity must be at least 1']
    },
    enrolled: [{
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      },
      enrolledAt: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['active', 'canceled', 'completed'],
        default: 'active'
      }
    }],
    waitlist: [{
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }],
    price: {
      amount: {
        type: Number,
        required: [true, 'Price amount is required']
      },
      currency: {
        type: String,
        default: 'PKR'
      }
    },
    location: {
      type: String,
      required: [true, 'Location is required']
    },
    status: {
      type: String,
      enum: ['scheduled', 'in-progress', 'completed', 'canceled'],
      default: 'scheduled'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual to calculate available spots
ClassSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.enrolled.filter(e => e.status === 'active').length;
});

// Virtual to check if class is full
ClassSchema.virtual('isFull').get(function() {
  return this.availableSpots <= 0;
});

// Virtual to get the number of students on waitlist
ClassSchema.virtual('waitlistCount').get(function() {
  return this.waitlist.length;
});

const Class = mongoose.model('Class', ClassSchema);

export default Class;