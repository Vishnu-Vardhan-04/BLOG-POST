// routes/profile.js
const express = require('express');
const User = require('../models/User');
const Article = require('../models/Article');
const router = express.Router();

// GET profile page
router.get('/', async (req, res) => {
    const user = await User.findById(req.session.userId);
    const articlesCount = await Article.countDocuments({ userId: req.session.userId });
    res.render('profile', { user, articlesCount });
});

// POST update profile
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    await User.findByIdAndUpdate(req.session.userId, { name, email });
    res.redirect('/profile');
});




module.exports = router;
