// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Article = require('./models/Article');

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Home Route (if not already added)
app.get('/', (req, res) => {
    res.redirect('/signup'); // Redirect to the login page
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Failed:', err));

// Routes
app.use('/', require('./routes/auth'));      // For login, signup
app.use('/articles', require('./routes/articles')); // For article CRUD
app.use('/profile', require('./routes/profile'));   // For profile page
app.use('/contact', require('./routes/contact'));   // For contact page

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
