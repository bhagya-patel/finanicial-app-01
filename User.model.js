const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  preferences: {
    darkMode: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);