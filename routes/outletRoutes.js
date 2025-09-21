const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// The fix is to add 'getAllOutletsWithMenus' to this import list
const { 
  getAllOutlets, 
  getOutletById, 
  getAllOutletsWithMenus 
} = require('../controllers/outletController');

router.get('/', auth, getAllOutlets);
// This route is for the global food search
router.get('/all', auth, getAllOutletsWithMenus);
router.get('/:id', auth, getOutletById);

module.exports = router;