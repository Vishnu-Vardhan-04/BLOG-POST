// routes/articles.js
const express = require('express');
const Article = require('../models/Article');
const router = express.Router();

// GET articles page
router.get('/', async (req, res) => {
    const articles = await Article.find({ userId: req.session.userId });
    res.render('articles', { articles });
});

// POST new article
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) return res.redirect('/articles');
    
    const article = new Article({ title, description, userId: req.session.userId });
    await article.save();
    res.redirect('/articles');
});


// POST route to handle editing an article
router.post('/articles/:id/edit', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        // Find the article by ID and update it
        await Article.findByIdAndUpdate(id, { title: title, description: description });
        res.redirect('/articles'); // Redirect to articles page after successful update
    } catch (err) {
        console.error('Error updating article:', err);
        res.status(500).send('Error updating article');
    }
});

// Update article
router.post('/:id', async (req, res) => {
    const { title, description } = req.body;
    await Article.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect('/articles');
});

// Delete article
router.post('/:id/delete', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles');
});

module.exports = router;
