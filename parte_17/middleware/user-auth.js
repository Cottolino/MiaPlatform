//Controllo Autenticazione
function userAuth(req,res,next)
{
    const isLogged = false;
    if(!isLogged)
    {
        return res.status(401).send('Non sei autenticato');
    }
    //Modifico req per passare parametri tra le middleware
    req.user = { nome: 'Giuseppe' , tipo: 'Standard' };
    next();
}

//Controllo Autorizzazione
function userPerms(req,res,next)
{
    const isAutorizzato = req.user.tipo === 'Premium' ?true:false;
    if(!isAutorizzato) return res.status(403).send('Non sei autorizzato');
    next();
}

module.exports = { userAuth, userPerms };