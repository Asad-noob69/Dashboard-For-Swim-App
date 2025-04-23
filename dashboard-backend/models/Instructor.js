import mongoose from 'mongoose';

const InstructorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    specialties: [{
      type: String,
      trim: true,
    }],
    certifications: [{
      title: String,
      issuedBy: String,
      issueDate: Date,
      expiryDate: Date,
      documentUrl: String,
      verified: {
        type: Boolean,
        default: false,
      }
    }],
    experience: {
      type: Number, // Years of experience
      default: 0,
    },
    availability: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      },
      slots: [{
        startTime: String,
        endTime: String,
      }]
    }],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        comment: {
          type: String,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    assignedClasses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Virtual method to calculate average rating
InstructorSchema.virtual('averageRating').get(function () {
  if (this.reviews.length === 0) return 0;
  
  const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
  return (sum / this.reviews.length).toFixed(1);
});

// Update the rating field when a new review is added or removed
InstructorSchema.pre('save', function (next) {
  if (this.reviews.length > 0) {
    const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
    this.rating = (sum / this.reviews.length).toFixed(1);
  }
  next();
});

const Instructor = mongoose.model('Instructor', InstructorSchema);

export default Instructor;