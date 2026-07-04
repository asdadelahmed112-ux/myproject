import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: "static_student_user"
  },
  items: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);