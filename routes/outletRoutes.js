const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllOutlets, getOutletById } = require('../controllers/outletController');

// All outlet routes are protected
router.get('/', auth, getAllOutlets);
router.get('/:id', auth, getOutletById);

module.exports = router;
