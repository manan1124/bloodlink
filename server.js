require('dotenv').config();
const PATH = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dns = require("node:dns/promises")
dns.setServers(['8.8.8.8', '1.1.1.1'])

const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const donorRoutes = require('./routes/donorRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const root = PATH.join(PATH.resolve() + "/dist");
app.use(express.static(root));

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://mananneema2405_db_user:pRI9AUzB0p6fRUE5@cluster0.tplom2g.mongodb.net/bloodlink?appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/donors', donorRoutes);

app.get('/{*splat}', (req, res) => {
  res.sendFile("index.html", { root })
  // res.send()
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
