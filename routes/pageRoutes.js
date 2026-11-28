const express = require('express');
const path = require('path');

const router = express.Router();
const viewsPath = path.join(__dirname, '..', 'views');

router.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, 'index.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(viewsPath, 'about.html'));
});

router.get('/skills', (req, res) => {
    res.sendFile(path.join(viewsPath, 'skills.html'));
});

router.get('/hobbies', (req, res) => {
    res.sendFile(path.join(viewsPath, 'hobbies.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(viewsPath, 'contact.html'));
});

module.exports = router;