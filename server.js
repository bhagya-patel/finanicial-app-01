require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.get('/', (req, res) => res.send('Financial Management Backend Running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));