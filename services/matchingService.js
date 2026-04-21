const User = require('../models/User');

const getCompatibleBloodGroups = (recipientBloodGroup) => {
  const compatibilityMap = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-']
  };
  return compatibilityMap[recipientBloodGroup] || [];
};

exports.findMatchingDonors = async (request) => {
  const compatibleGroups = getCompatibleBloodGroups(request.bloodGroup);
  const donors = await User.find({
    role: 'Donor',
    bloodGroup: { $in: compatibleGroups },
    city: request.city
  });
  return donors;
};
