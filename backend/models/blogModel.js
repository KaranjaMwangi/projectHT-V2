const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String }, // Cloudinary URL
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: [String], default: [] }, // Pre-populate with your keywords
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);