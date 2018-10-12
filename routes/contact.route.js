const contactController = require('../controllers/contact.controller');
const router = require('express').Router();
const customValidator = require('../helpers/custom.validator.helper');
const errorBuilder = require('../helpers/error.builder.helper');

module.exports = function () {
  router.get('/', contactController.getSome);
  router.get('/:id', contactController.getOne);
  router.post('/', customValidator.contact(), errorBuilder, contactController.create);
  router.put('/:id', contactController.update);
  router.delete('/:id', contactController.delete);
  return router;
};
