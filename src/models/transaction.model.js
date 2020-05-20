import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    deliveryDate: {
      // TODO: is this automatic or entered
      type: Date,
      required: [true, 'The delivery date is required'],
    },

    userid: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'The user is required'],
    },

    payload: {
      // TODO: List of items or number
      type: [String],
      required: [true, 'Please list the delivered items'],
    },

    paymentVoucherNumber: {
      type: Number,
      required: [true, 'Please provide a payment voucher number'],
    },

    purchaseOrderNumber: {
      type: Number,
      required: [true, 'Please provide a purchase order number'],
    },

    projectCode: {
      type: String,
      required: [true, 'Please provide a project code'],
    },

    activityLine: {
      // TODO: which format is this
      type: String,
      required: [true, 'Please provide the activity line'],
    },

    paymentRequisitionDate: {
      // TODO: How this is calculated
      type: Date,
      default: Date.now(),
    },

    amountToBePaid: {
      // TODO: How this is calculated
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

transactionSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'transaction',
  localField: '_id',
});

export default mongoose.model('Transaction', transactionSchema);
