const express = require('express');
const app = express();
const coinInfoRoutes = require('./src/routes/coinInfoRoutes');
const klineRoutes = require('./src/routes/klineRoutes');
const cors = require('cors');
const responseFormatter = require('./src/middleware/responseFormatter');
const newsRoutes = require('./src/routes/newsRoutes');
require('dotenv').config();
const { testConnection } = require('./config/db');
// 中間件
app.use(express.json());
app.use(cors());
app.use(responseFormatter);
// 路由
app.use('/api', coinInfoRoutes, klineRoutes, newsRoutes);

// 啟動服務器
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  testConnection();
});
