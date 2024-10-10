const { User } = require('../models');

async function register(user) {
  const result = await User.create({
    email: user.email,
    password: user.password,
    name: user.name,
    created_at: new Date(),
    updated_at: new Date(),
    last_login: new Date(),
  });
  const resultJson = result.toJSON();
  delete resultJson.password;
  return resultJson;
}

module.exports = {
  register,
};
