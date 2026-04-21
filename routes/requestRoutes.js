const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const auth = require('../middleware/auth');

router.post('/', auth, requestController.createRequest);
router.get('/', requestController.getRequests);

module.exports = router;
