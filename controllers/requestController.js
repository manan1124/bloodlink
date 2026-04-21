const BloodRequest = require('../models/BloodRequest');
const matchingService = require('../services/matchingService');
const emailService = require('../services/emailService');

exports.createRequest = async (req, res) => {
  try {
    const { bloodGroup, units, urgency, hospital, city, contactPhone } = req.body;
    const request = new BloodRequest({
      recipient: req.user.id,
      bloodGroup, units, urgency, hospital, city, contactPhone
    });
    await request.save();

    const donors = await matchingService.findMatchingDonors(request);
    await emailService.sendBulkEmail(donors, request);

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: 'Active' }).populate('recipient', 'name email phone age');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
