const Expense = require('../models/Expense');

// Fetch User Expenses
const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.json(expenses);
};

// Add an Expense
const addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  const expense = new Expense({
    user: req.user.id,
    title,
    amount,
    category,
    date,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
};

module.exports = { getExpenses, addExpense };
