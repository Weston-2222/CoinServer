const express = require('express');
const app = express();
const coinInfoRoutes = require('./src/routes/coinInfoRoutes');
require('dotenv').config();
const { testConnection } = require('./config/db');
// 中間件
app.use(express.json());

// 路由
app.use('/api', coinInfoRoutes);

// 啟動服務器
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  testConnection();
});
