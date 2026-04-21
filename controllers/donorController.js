const User = require('../models/User');

exports.getDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    const filter = { role: 'Donor' };
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (city) filter.city = new RegExp(city, 'i');
    
    const donors = await User.find(filter).select('-password');
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
