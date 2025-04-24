import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student reference is required'],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Parent reference is required'],
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class reference is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    currency: {
      type: String,
      default: 'PKR',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'jazzCash', 'easypaisa', 'payfast', 'stripe', 'bank_transfer', 'cash'],
      required: [true, 'Payment method is required'],
    },
    transactionId: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    description: String,
    receiptUrl: String,
    refundAmount: {
      type: Number,
      default: 0,
    },
    refundReason: String,
    refundDate: Date,
    refundedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
    },
    isLate: {
      type: Boolean,
      default: false,
    },
    lateFee: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to calculate total amount including any fees or discounts
PaymentSchema.virtual('totalAmount').get(function () {
  return this.amount + this.lateFee - this.discountAmount;
});

// Index for faster lookups
PaymentSchema.index({ parent: 1, status: 1 });
PaymentSchema.index({ student: 1, class: 1 });
PaymentSchema.index({ transactionId: 1 });

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;