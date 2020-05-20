import Transactions from '../models/transaction.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/app-error';

export const getAllTransactions = catchAsync(async (req, res) => {
  let user = {};

  if (req.user) user = { userid: req.user.id };

  console.log(user);

  const transactions = await Transactions.find(user);

  res.status(200).json({
    status: 'success',
    data: {
      transactions,
    },
  });
});

export const getTransaction = catchAsync(async (req, res) => {
  const transaction = await Transactions.findById(req.params.id).populate(
    'comments'
  );

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

export const createTransaction = catchAsync(async (req, res) => {
  req.body.userid = req.user.id;
  const transaction = await Transactions.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

export const deleteTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transactions.findByIdAndDelete(req.params.id);

  if (!transaction)
    return next(
      new AppError(`No transaction found with ID: ${req.params.id}`, 404)
    );

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

export const updateTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transactions.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!transaction)
    return next(new AppError(`No view found with ID: ${req.params.id}`, 404));

  res.status(200).json({
    status: 'Success',
    data: {
      transaction,
    },
  });
});
