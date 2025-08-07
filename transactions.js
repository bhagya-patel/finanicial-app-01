const express = require('express');
const router = express.Router();
const Transaction = require('./Transaction.model');
const verifyToken = require('../middlewares/authMiddleware');
router.get('/', verifyToken, async (req, res) => {
  const { category, startDate, endDate, type } = req.query;
  const userId = req.user.id;
  let filter = { userId };
  if(type) filter.type = type;
  if(category) filter.category = category;
  if(startDate || endDate) filter.date = {};
  if(startDate) filter.date.$gte = new Date(startDate);
  if(endDate) filter.date.$lte = new Date(endDate);
  try {
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});
router.post('/', verifyToken, async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;
    const newTx = new Transaction({ userId: req.user.id, type, category, amount, date, description });
    await newTx.save();
    res.status(201).json(newTx);
  } catch (err) {
    res.status(400).json({ message: 'Bad Request' });
  }
});
module.exports = router;