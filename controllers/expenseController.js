const Expense = require('../models/Expense');

// Fetch User Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

// Add an Expense
const addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const expense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      date,
    });

    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add expense' });
  }
};

// Update an Expense
const updateExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Ensure the user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this expense' });
    }

    // Update fields
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update expense' });
  }
};

// Delete an Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Ensure the user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this expense' });
    }

    await expense.remove();
    res.json({ message: 'Expense removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense' });
  }
};

module.exports = { getExpenses, addExpense, updateExpense, deleteExpense };
