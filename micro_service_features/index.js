require('dotenv').config();
const express = require('express');
const featureRoutes = require('./routes/features');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/features', featureRoutes);

app.listen(port, () => {
    console.log(`Features service running on port ${port}`);
});

// # Login per ottenere il token
// curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"giuseppe19","password":"giuseppe19"}'

// # Usare il token per accedere alle funzionalità
// curl -X GET http://localhost:4000/api/features -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTEyYWNjODc4YzNlY2QxYzA4ZmQxOCIsInVzZXJuYW1lIjoiZ2l1c2VwcGUxOSIsImlhdCI6MTcyMDg3NjgyNCwiZXhwIjoxNzIwODgwNDI0fQ.cCsRaYncEIaZJgXQ8KBTwTjI27Ylyq8ssW9Y1Dh8Weo"