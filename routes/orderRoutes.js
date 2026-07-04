import express from 'express';
import { createOrderFromCart, getPastOrders } from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(createOrderFromCart).get(getPastOrders);

export default router;
