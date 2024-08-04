const express = require('express');
const { getProdotti, createProdotto, getProdotto } = require('../controllers/catalogController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/getProdotti', getProdotti);
router.post('/createProdotto', auth, createProdotto);
router.get('/getProdotto/:id', getProdotto);


module.exports = router;