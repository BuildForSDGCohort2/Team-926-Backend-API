const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  username: { type: Number, required: true },
});

module.exports = mongoose.model('Member', memberSchema);