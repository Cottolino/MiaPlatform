const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { getFeatures, createFeature } = require('../controllers/featuresController');

const router = express.Router();

router.get('/', authenticateToken, getFeatures);
router.post('/', authenticateToken, createFeature);

module.exports = router;