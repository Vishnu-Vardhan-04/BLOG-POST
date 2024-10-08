// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// GET signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// POST signup form
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.redirect('/signup');
    }
});

// GET login page
router.get('/login', (req, res) => {
    res.render('login');
});

// POST login form
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/articles');
    } else {
        res.redirect('/login');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
