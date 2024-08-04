const auth = async (req, res, next) => {
    console.log(req.body);
    next();
}

module.exports = auth;