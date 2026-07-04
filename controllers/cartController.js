import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const USER_ID = "static_student_user";

const getOrCreateCart = async () => {
  let cart = await Cart.findOne({ userId: USER_ID });
  if (!cart) cart = await Cart.create({ userId: USER_ID, items: [] });
  return cart;
};

export const viewCart = async (req, res, next) => {
  try { const cart = await getOrCreateCart(); await cart.populate('items.product', 'name price stock'); res.status(200).json({ success: true, data: cart }); } catch (error) { next(error); }
};
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body; const qty = parseInt(quantity) || 1;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    if (product.stock < qty) return res.status(400).json({ success: false, message: 'Insufficient stock' });
    const cart = await getOrCreateCart();
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) { cart.items[itemIndex].quantity += qty; } else { cart.items.push({ product: productId, quantity: qty }); }
    await cart.save(); res.status(200).json({ success: true, data: cart });
  } catch (error) { next(error); }
};
export const updateCartQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body; if (quantity < 1) return res.status(400).json({ success: false, message: 'Min quantity is 1' });
    const cart = await getOrCreateCart(); const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ success: false, message: 'Not found in cart' });
    cart.items[itemIndex].quantity = quantity; await cart.save(); res.status(200).json({ success: true, data: cart });
  } catch (error) { next(error); }
};
export const removeFromCart = async (req, res, next) => {
  try { const cart = await getOrCreateCart(); cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId); await cart.save(); res.status(200).json({ success: true, data: cart }); } catch (error) { next(error); }
};
