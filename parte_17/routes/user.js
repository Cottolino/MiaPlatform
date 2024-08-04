const express = require('express');
const router = express.Router();


router.get('/user/risorsa-1', (req,res) => {
    res.send('Ecco la risorsa premium...');
});

module.exports = router;