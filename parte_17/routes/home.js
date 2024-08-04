const express = require('express');
const router = express.Router();
const ErrorHandler = require('../helper/ErrorHandler');

router.get('/', (req,res,next) => {


    //Codice Sincrono
    // throw new Error('Error rotta!!!');

    //Viene passata alla middeleware error
    // throw new ErrorHandler(401,'richiesta non corretta. Dovevi fare...');

    

    //Codice Asincrono
    // setTimeout(() => {
    //     next(new Error('Error thrown'));
    // }, 50);
    // res.send('Home page');
    res.json({message: 'Home page'});
});

module.exports = router;