const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  tags:        [String],
  solution:    { type: String },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);
