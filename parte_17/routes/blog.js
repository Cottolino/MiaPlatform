const express = require('express');
const router = express.Router();

router.get('/articoli', (req,res) => {
    // res.send('Pagina Articoli');
    res.status(301).redirect('/blog/news');
});
router.get('/news', (req,res) => {
    res.send('Pagina News');
});
router.get('/articolo/:titolo', (req,res) => {
    res.send('Pagina Articolo');
});

module.exports = router;