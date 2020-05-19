import express from 'express';

import {
  createTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller';

import { protect, restrictTo } from '../controllers/auth.controller';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    protect,
    restrictTo('user', 'manager', 'accounts', 'finance', 'admin'),
    getAllTransactions
  )
  .post(protect, restrictTo('user'), createTransaction);

router
  .route('/:transaction-id')
  .post(protect, restrictTo('admin'), getTransaction)
  .patch(protect, restrictTo('admin'), updateTransaction)
  .delete(protect, restrictTo('admin'), deleteTransaction);

export default router;
