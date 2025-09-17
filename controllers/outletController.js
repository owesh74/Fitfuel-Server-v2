const Outlet = require('../models/Outlet');

exports.getAllOutlets = async (req, res) => {
  try {
    const outlets = await Outlet.find().select('-menu'); // Exclude menu details for the list view
    res.json(outlets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getOutletById = async (req, res) => {
  try {
    const outlet = await Outlet.findById(req.params.id);
    if (!outlet) {
      return res.status(404).json({ msg: 'Outlet not found' });
    }
    res.json(outlet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};