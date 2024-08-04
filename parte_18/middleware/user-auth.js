const jwt = require('jsonwebtoken');
const fs = require('fs');


function verifyToken (req, res, next) {
    //E' il client che invia al server il token
    //Rquest Header => REQ

    //il cookie memorizzato verrà inviato automaticamente insieme alla richiesta
    const token = req.cookies.token;
    if(!token) return res.status(401).send('Token not found');
    try
    {
        const pub_key = fs.readFileSync('rsa.public');
        //Integrità dei Dati
        req.user = jwt.verify(token, process.env.JWT_KEY);
        // console.log(req.user);
        next();
    }
    catch(err)
    {
        res.status(401).send('Token not valid or expired');
    }
    //Quando chiudi il browser il cookie viene cancellato
}

function signToken(req,res,next)
{
        //Crittografia ASIMMETRIC KEY


    //Simulazuione di un login OK!
    const payload = { id: 1, tipoUtente: 'premium', tema: 'dark' };

    const cookieSetting = {
        expires: new Date(Date.now() + 10000),
        httpOnly: true,
        secure: false
    }
    const prv_key = fs.readFileSync('rsa.private');
    const option = { expiresIn: '100s'};
    //Se il login è ok, genero il token
    const token = jwt.sign(payload, process.env.JWT_KEY, option);
    //Invio il token al client
    // res.send(token);

    //E' il server che invia il token al client SET COOKIE
    //Response Header
    //Risposta del server => RES

    //il server può decidere di creare un cookie per quel client
    res.cookie('token', token, cookieSetting);
    next();
}

function deleteToken()
{
    const cookieSetting = {
        expires: new Date(0),
        httpOnly: true,
        secure: false
    }

    res.cookie('token','', cookieSetting);
    next();
}

module.exports = {
    verifyToken,
    signToken,
    deleteToken
};