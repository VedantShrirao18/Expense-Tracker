const express = require('express');
const { getExpenses, addExpense, updateExpense, deleteExpense } = require('../controllers/expenseController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Routes for fetching and adding expenses
router.route('/').get(protect, getExpenses).post(protect, addExpense);

// Routes for updating and deleting a specific expense by ID
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;
