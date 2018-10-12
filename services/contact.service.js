const Contact = require('../models/contact.model');

module.exports = {
  findSome(page, limit) {
    return Contact.find().limit(limit).skip(limit * (page - 1));
  },
  findOne(id) {
    return Contact.findById(id);
  },
  create(data) {
    const newContact = new Contact(data);
    return newContact.save();
  },
  update(id, data) {
    return Contact.findByIdAndUpdate(id, data, {new: true, runValidators: true});
  },
  destroy(id) {
    return Contact.findByIdAndRemove(id);
  },
  count() {
    return Contact.estimatedDocumentCount();
  }
};
