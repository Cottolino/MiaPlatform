const morgan = require('morgan');
const express = require('express');
const app = express();

// se non è settato il valore di NODE_ENV, setta il valore a development
require('dotenv').config({
    path: `.env.${ app.get('env') }`
});


console.log(process.env.APP_PWD);

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

if(app.get('env') == 'development')
{
    app.use(morgan('tiny'));
}
app.get('/',(req,res)=>{
    res.send('Home page');
});



app.listen(3000,()=> console.log('Server listen in 3000'));