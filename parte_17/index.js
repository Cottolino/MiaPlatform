const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const fs = require('fs');
const { userAuth, userPerms } = require('./middleware/user-auth');
const appError = require('./middleware/error');

//Sotto applicazioni Express
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const contattiRouter = require('./routes/contatti');
const _404Router = require('./routes/404');



const app = express();
const log = fs.createWriteStream('access.log', { flags: 'a' });

//Middleware logging
// app.use(morgan('combined', { stream: log }));

//Sicurezza dell'app aggingendo header di sicurezza
// app.use(helmet());

// Applica a tutte le richieste /user
app.use('/user',userAuth,userPerms);

app.use(homeRouter);
app.use(userRouter);
//Mounting di blogRouter
app.use('/blog',blogRouter);
app.use(contattiRouter);
app.use(_404Router);

app.use(appError);

app.listen(3000,()=> console.log('Server listen in 3000'));