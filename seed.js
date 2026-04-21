require('dotenv').config();
const dns = require("node:dns/promises")
dns.setServers(['8.8.8.8', '1.1.1.1'])
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const BloodRequest = require('./models/BloodRequest');
const DonationHistory = require('./models/DonationHistory');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mananneema2405_db_user:pRI9AUzB0p6fRUE5@cluster0.tplom2g.mongodb.net/bloodlink?appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB for Seeding'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const seedDatabase = async () => {
  try {
    console.log('Clearing old data...');
    await User.deleteMany();
    await BloodRequest.deleteMany();
    await DonationHistory.deleteMany();

    const passwordHash = await bcrypt.hash('password123', 10);

    const usersData = [
      // Donors
      { name: 'John Doe', email: 'john@example.com', password: passwordHash, role: 'Donor', bloodGroup: 'O+', city: 'New York', age: 30, phone: '555-0101' },
      { name: 'Jane Smith', email: 'jane@example.com', password: passwordHash, role: 'Donor', bloodGroup: 'A-', city: 'Los Angeles', age: 25, phone: '555-0102' },
      { name: 'Michael Brown', email: 'michael@example.com', password: passwordHash, role: 'Donor', bloodGroup: 'B+', city: 'New York', age: 40, phone: '555-0103' },
      { name: 'Emily Davis', email: 'emily@example.com', password: passwordHash, role: 'Donor', bloodGroup: 'AB+', city: 'Chicago', age: 22, phone: '555-0104' },
      { name: 'David Wilson', email: 'david@example.com', password: passwordHash, role: 'Donor', bloodGroup: 'O-', city: 'New York', age: 35, phone: '555-0105' },

      // Recipients
      { name: 'Sarah Connor', email: 'sarah@example.com', password: passwordHash, role: 'Recipient', bloodGroup: 'A+', city: 'New York', age: 28, phone: '555-0201' },
      { name: 'Tom Hanks', email: 'tom@example.com', password: passwordHash, role: 'Recipient', bloodGroup: 'O-', city: 'Los Angeles', age: 50, phone: '555-0202' },
    ];

    const createdUsers = await User.insertMany(usersData);
    console.log(`Inserted ${createdUsers.length} users.`);

    const sarah = createdUsers.find(u => u.email === 'sarah@example.com');
    const tom = createdUsers.find(u => u.email === 'tom@example.com');

    const requestsData = [
      {
        recipient: sarah._id,
        bloodGroup: 'A+',
        units: 2,
        urgency: 'Critical',
        hospital: 'NYU Langone',
        city: 'New York',
        status: 'Active'
      },
      {
        recipient: tom._id,
        bloodGroup: 'O-',
        units: 1,
        urgency: 'Normal',
        hospital: 'Cedars-Sinai',
        city: 'Los Angeles',
        status: 'Active'
      }
    ];

    const createdRequests = await BloodRequest.insertMany(requestsData);
    console.log(`Inserted ${createdRequests.length} blood requests.`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
