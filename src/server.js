const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');

const app = express();
app.use(cors({ origin: '*' }));
const server = http.Server(app);

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

console.log('port' + PORT);
console.log('process port' + process.env.PORT);
server.listen(PORT);

