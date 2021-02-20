const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');

const app = express();
app.use(cors({ origin: '*' }));
const server = http.Server(app);

app.use(express.json());
app.use(routes);



server.listen(3000);


//npm install express
//npm install nodemon -D
//npm install knex
//npm install mysql
//npx knex init
//npm install cors
//rodar aplicacao
// node index.js