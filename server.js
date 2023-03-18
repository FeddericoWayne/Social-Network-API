// imports express and connection module
const express = require('express');
const db = require('./config/connection');

// imports controller directory
const routes = require('./controllers');

// starts an instance of express
const app = express();
// assigns server PORT
const PORT = process.env.PORT || 3001;

// express built-in middleware setting
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// turns API router on
app.use(routes);


// turns on server once successfully connected to database
db.once('open',()=>{
    app.listen(PORT,()=>{
        console.log(`API server now open and running at http://localhost:${PORT}`);
    });
});