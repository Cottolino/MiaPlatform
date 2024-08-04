const bodyparser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyparser.json());

function fn (req, res, next) {
    console.log(req.body);
    next();
}

app.post('/login', fn, (req, res) => {
    console.log('login');
    res.send();
});


app.listen(3000, () => {});

