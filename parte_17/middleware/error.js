function appError(err,req,res,next) 
{
    res.status(err.statusCode).send(err.message);
}

module.exports = appError;