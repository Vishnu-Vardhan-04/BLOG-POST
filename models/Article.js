// models/Article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
