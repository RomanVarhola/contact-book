const User = require('../models/user.model');

module.exports = {
  findByEmail(email) {
    return User.findOne({email});
  },
  findById(id) {
    return User.findById(id);
  }
};
