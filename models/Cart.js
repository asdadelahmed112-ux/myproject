import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'], default: 1 }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, default: "static_student_user" },
  items: [cartItemSchema]
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
