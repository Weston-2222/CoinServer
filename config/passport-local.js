const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../src/models').User;
const { jwt_config } = require('./env');
const access_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 從 Authorization Header 中提取 JWT
  secretOrKey: jwt_config.access_secret, // 用於簽名的密鑰
};
const refresh_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 從 Authorization Header 中提取 JWT
  secretOrKey: jwt_config.refresh_secret, // 用於簽名的密鑰
  passReqToCallback: true, // 允許將 req 傳遞給驗證函數
};
// 使用 JwtStrategy
passport.use(
  'access',
  new JwtStrategy(access_opts, async (jwt_payload, done) => {
    try {
      // 根據 jwt_payload 查找使用者
      const user = await User.findOne({ where: { id: jwt_payload.id } });

      if (user) {
        return done(null, user); // 驗證成功
      } else {
        return done(null, false); // 驗證失敗
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
passport.use(
  'refresh',
  new JwtStrategy(refresh_opts, async (req, jwt_payload, done) => {
    try {
      const user = await User.findOne({ where: { id: jwt_payload.id } });

      if (!user) {
        return done(null, false); // 驗證失敗
      }
      const headerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      console.log(headerToken);
      if (user.refresh_token == headerToken) {
        return done(null, user); // 驗證成功
      } else {
        return done(null, false); // 驗證失敗
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
module.exports = passport;
