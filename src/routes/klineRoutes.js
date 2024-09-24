const express = require('express');
const router = express.Router();
const { Klines } = require('../controllers');

router.get('/klines/:id', async (req, res) => {
  try {
    const data = await Klines.findOne(req.params.id);
    res.sendFormattedJson(data);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
});

module.exports = router;
