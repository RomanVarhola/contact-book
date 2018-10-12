const contactService = require('../services/contact.service');

module.exports = {
  getSome(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    Promise.all([
      contactService.findSome(page, limit),
      contactService.count()
    ]).then(results => {
      const [contacts, total] = results;
      res.status(200).json({data: {contacts, total, page, limit}});
    })
  },
  getOne(req, res, next) {
    contactService.findOne(req.params.id).then(contact => {
      if (contact) {
        return res.status(200).json({data: {contact}});
      }
      res.status(404).json({data: null, error: 'Сontact doesn\'t found'});
    }).catch(err => next(err));
  },
  create(req, res, next) {
    contactService.create(req.body).then(contact => {
      if (contact) {
        return res.status(201).json({message: 'Contact was created!', data: {contact}});
      }
    }).catch(err => {
      res.status(422).json({data: null, error: 'Сontact doesn\'t created!'});
    });
  },
  update(req, res, next) {
    contactService.update(req.params.id, req.body).then(contact => {
      if (contact) {
        return res.status(200).json({message: 'Contact was updated!', data: {contact}});
      }
      res.status(404).json({data: null, error: 'Contact doesn\'t found!'});
    }).catch(err => {
      res.status(422).json({data: null, error: 'Сontact doesn\'t updated!'});
    });
  },
  delete(req, res, next) {
    contactService.destroy(req.params.id).then(contact => {
      if (contact) {
        return res.status(200).json({message: 'Contact was destroyed!', data: {contact}});
      }
      res.status(404).json({data: null, error: 'Contact doesn\'t found!'})
    }).catch(err => {
      res.status(422).json({data: null, error: 'Сontact doesn\'t deleted!'});
    });
  }
};
