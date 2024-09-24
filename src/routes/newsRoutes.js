const express = require('express');
const router = express.Router();
const News = require('../controllers').News;

router.get('/news', async (req, res) => {
  try {
    const data = await News.findPage(req.query.page, req.query.size);

    res.sendFormattedJson(data.data, {
      total: data.total,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      pageSize: data.pageSize,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
});

module.exports = router;
