const passport = require('passport');
const User = require('../models/user.model');

module.exports = {
  getMe(req, res) {
    const user = req.user;
    return res.status(200).json({data: {user}});
  },
  login(req, res, next) {
    passport.authenticate('local', {session: true}, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (user) {
        req.login(user, {session: false}, (err) => {
          if (err) return next(err);

          return res.status(200)
            .json({code: 200, message: 'You are signed in!', data: {user, token: user.generateJWT()}});
        });
      } else {
        return res.status(422).json(info);
      }
    })
    (req, res, next);
  },
  register(req, res) {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        return res.status(422).json({data: null, error: err.message});
      }
      res.status(201).json({message: 'You are registered', data: {user}});
    })
  }
};
