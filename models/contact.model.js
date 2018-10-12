const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: { 
    type: String, lowercase: true, unique: true, required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], sparse: true
  },
  phone: {type: String, lowercase: true, unique: true, sparse: true},
  date_of_birth: {type: Date},
  address: {type: String}

}, {timestamps: true});

ContactSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('Contact', ContactSchema);
