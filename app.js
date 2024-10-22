const express = require('express');
const app = express();
const coinInfoRoutes = require('./src/routes/coinInfoRoutes');
const klineRoutes = require('./src/routes/klineRoutes');
const cors = require('cors');
const responseFormatter = require('./src/middleware/responseFormatter');
const newsRoutes = require('./src/routes/newsRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
require('dotenv').config();
const { testConnection } = require('./config/db');
require('./config/passport-local');
const passport = require('passport');
// 中間件
app.use(express.json());
app.use(cors());
app.use(responseFormatter);
app.use(passport.initialize());
// 路由
app.use('/api', authRoutes);
app.use(
  '/api',
  coinInfoRoutes,
  klineRoutes,
  newsRoutes,
  userRoutes,
  authRoutes
);

// 啟動服務器
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  testConnection();
});
