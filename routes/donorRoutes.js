const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

router.get('/', donorController.getDonors);

module.exports = router;
