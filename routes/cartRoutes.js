import express from 'express';
import { viewCart, addToCart, updateCartQuantity, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.route('/').get(viewCart).post(addToCart).put(updateCartQuantity);
router.route('/:productId').delete(removeFromCart);

export default router;
