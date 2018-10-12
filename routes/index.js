const router = require('express').Router();
const contactRouter = require('./contact.route');
const authRouter = require('./auth.route');
const requiredAuth = require('../helpers/require.auth.helper');

router.use('/api', authRouter());
router.use('/api/contacts', requiredAuth(), contactRouter());

module.exports = router;
