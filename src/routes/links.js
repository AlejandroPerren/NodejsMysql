const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    try {
        const { title, url, description } = req.body;
        const newLink = {
            title,
            url,
            description
        };
        // Usar 'SET ?' para insertar el objeto directamente
        await pool.query('INSERT INTO links SET ?', [newLink]);
        res.send('Link added successfully');
    } catch (err) {
        console.error('Error al agregar el link:', err);
        res.status(500).send('Error al agregar el link');
    }
});

module.exports = router;

