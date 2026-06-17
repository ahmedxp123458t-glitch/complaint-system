const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  department: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'in-progress', 'resolved', 'rejected'], default: 'pending' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
});

module.exports = mongoose.model('Complaint', complaintSchema);
