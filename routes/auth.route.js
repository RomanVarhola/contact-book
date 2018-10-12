const authController = require('../controllers/auth.controller');
const requiredAuth = require('../helpers/require.auth.helper');
const router = require('express').Router();

module.exports = function() {
  router.get('/me', requiredAuth(), authController.getMe);
  router.post('/login', authController.login);
  router.post('/register', authController.register);
  return router;
}
