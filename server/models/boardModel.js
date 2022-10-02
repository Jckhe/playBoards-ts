const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    username: {type: String, required: true, unique: true},
    boards: {type: String, required: true, }
  });

module.exports = mongoose.model('Board', boardSchema);