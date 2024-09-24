const express = require('express');
const router = express.Router();
const CoinInfo = require('../controllers').CoinInfo;

router.get('/coininfo', async (req, res) => {
  try {
    const data = await CoinInfo.findAll();
    res.sendFormattedJson(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/coininfo/:id', async (req, res) => {
  try {
    const data = await CoinInfo.findOne(req.params.id);
    res.sendFormattedJson(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
