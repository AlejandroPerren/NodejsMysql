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
        req.flash('success', 'Link Guardado Correctamente');
        res.redirect('/links');
    } catch (err) {
        console.error('Error al agregar el link:', err);
        res.status(500).send('Error al agregar el link');
    }
});

router.get('/', async (req,res) =>{
   const links = await pool.query('SELECT * FROM links');
   console.log(links)
   res.render('links/list', {links})
});

router.get('/delete/:id', async (req,res)=>{
    // console.log(req.params.id);//para ver los parametros correctos para borrar
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link Borrado Correctamente');
    res.redirect('/links')
});

// Ruta para mostrar el formulario de edición
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    // Obtener el link por ID para mostrarlo en el formulario de edición
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', { link: links[0] }); // Pasar el primer link a la vista
});

// Ruta para procesar la actualización
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body; // Obtener los datos editados
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Guardado Correctamente');
    res.redirect('/links');
});

module.exports = router;

