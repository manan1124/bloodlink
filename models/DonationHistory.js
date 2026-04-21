const mongoose = require('mongoose');

const donationHistorySchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodRequest' },
  date: { type: Date, default: Date.now },
  unitsDonated: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DonationHistory', donationHistorySchema);
