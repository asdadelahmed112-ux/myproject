import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const USER_ID = "static_student_user";

export const createOrderFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: USER_ID }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ success: false, message: 'Cart is empty' });
    let total = 0; const orderItems = [];
    for (const item of cart.items) {
      const dbProduct = await Product.findById(item.product._id);
      if (!dbProduct || dbProduct.stock < item.quantity) return res.status(400).json({ success: false, message: 'Stock conflict' });
      dbProduct.stock -= item.quantity; await dbProduct.save();
      total += dbProduct.price * item.quantity;
      orderItems.push({ product: dbProduct._id, name: dbProduct.name, price: dbProduct.price, quantity: item.quantity });
    }
    const order = await Order.create({ userId: USER_ID, items: orderItems, totalPrice: total });
    cart.items = []; await cart.save();
    res.status(201).json({ success: true, data: order });
  } catch (error) { next(error); }
};
export const getPastOrders = async (req, res, next) => {
  try { const orders = await Order.find({ userId: USER_ID }).sort({ createdAt: -1 }); res.status(200).json({ success: true, count: orders.length, data: orders }); } catch (error) { next(error); }
};
