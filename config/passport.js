const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services/user.service');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const config = require('./index');

passport.serializeUser((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  userService.findById(id).then((err, user) => {
    done(err, user);
  });
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  userService.findByEmail(email).then((user) => {
    if (!user || !user.validPassword(password)) {
      return done(null, false, {errors: ['email or password is invalid']});
    }
    return done(null, user);
  }).catch(done);
}));

passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
}, function (jwtPayload, cb) {
  return userService.findById(jwtPayload.id)
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
}));
