const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Donor', 'Recipient'], required: true },
  bloodGroup: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  lastDonationDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
