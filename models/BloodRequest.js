const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodGroup: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true 
  },
  units: { type: Number, required: true },
  urgency: { type: String, enum: ['Normal', 'Critical'], required: true },
  hospital: { type: String, required: true },
  city: { type: String, required: true },
  contactPhone: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Fulfilled', 'Closed'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
