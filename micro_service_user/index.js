const express = require('express');
const app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
//export DEBUG=app:generale
const debugGenerale = require('debug')('app:generale');
const cors = require('cors');

const authRouter = require('./routes/auth');

const client = new MongoClient(process.env.DB_URI);
var db = {};
var collection = {};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
// Configura CORS per non permettere richieste da domini non autorizzati
const corsOptions = {
    origin: true // Impostando 'origin' a false, non permettiamo nessuna richiesta cross-origin
  };
app.use(cors(corsOptions));

app.use('/',authRouter);

app.get('/test' , (req,res)=>{
    res.send('Test');
});


// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log(req.body);
//     debugGenerale('Login');
//     debugGenerale('Login attempt for user = %s', username);
//     debugGenerale('Password = %s', password);
//     try{
//         const user = await collection.findOne({username: username});
//         if(user)
//         {
//             const isPasswordCorrect = await bcrypt.compare(password, user.password);
//             if(isPasswordCorrect)
//             {
//                 const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//                 debugGenerale('Token = %s', token);
//                 debugGenerale('Login successful');
//                 return res.json({ token: token });
//                 // res.send('Login successful');
//             }
//             else
//             {
//                 debugGenerale('Login failed');
//                 return res.send('Login failed');
//             }
//         }
//         else
//         {
//             return res.send('No User Found');
//         }
//     }catch(err){
//         console.log(err);
//     }

// });
// app.post('/register', async (req, res) => {
//     console.log(req.body);
//     const { username, password } = req.body;
//     debugGenerale('Register');
//     debugGenerale('Register attempt for user = %s', username);
//     debugGenerale('Password = %s', password);
//     const user = await collection.findOne({username: username});
//     if(!user)
//     {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await collection.insertOne({username: username, password: hashedPassword});
//         console.log(result);
//         debugGenerale('User registered successfully');
//         return res.json({
//             message: 'User registered successfully',
//         });
//     }
//     else
//     {
//         debugGenerale('User already exists');
//         return res.json({
//             message: 'User already exists',
//         });
//     }

// });

app.listen(3000, () => {
    try{
        // client.connect();
        // db = client.db('Testing');
        // collection = db.collection('users');
        console.log('Server running on port 3000');
        ping();
    }
    catch(err)
    {
        console.log(err);
    }
});


//Controllo connessione
async function ping()
{
    let pingResult = await client.db().admin().ping();
    if(pingResult.ok == 1)
    {
        // console.log('Connesso al DB');
        debugGenerale('Connesso al DB');
    }
    else
    {
        // console.log('Non Connesso');
        debugGenerale('Non Connesso al DB');
    }
}
