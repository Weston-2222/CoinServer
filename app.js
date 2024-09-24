const express = require('express');
const app = express();
const coinInfoRoutes = require('./src/routes/coinInfoRoutes');
const klineRoutes = require('./src/routes/kline');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/db');
// 中間件
app.use(express.json());
app.use(cors());
app.use(responseFormatter);
// 路由
app.use('/api', coinInfoRoutes, klineRoutes);

// 啟動服務器
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  testConnection();
});
