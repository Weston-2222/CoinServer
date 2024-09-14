const express = require('express');
const router = express.Router();
const CoinInfo = require('../controllers').CoinInfo;
router.use((req, res, next) => {
  console.log('coinInfo route正在接受一個request...');
  next();
});
router.get('/', async (req, res) => {
  try {
    const data = await CoinInfo.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
