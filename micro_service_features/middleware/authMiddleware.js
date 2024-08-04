const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    console.log(req.headers); // Logging per debug
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log("NO TOKEN!"); // Logging per debug
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) 
        {
            console.log("TOKEN ERROR!"); // Logging per debug
            return res.sendStatus(403);
        }
        req.user = user;
        console.log("LOGIN OK!"); // Logging per debug
        next();
    });
};

module.exports = { authenticateToken };