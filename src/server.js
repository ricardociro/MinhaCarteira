const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');

const app = express();
app.use(cors({ origin: '*' }));
const server = http.Server(app);

app.use(express.json());
app.use(routes);


const PORT = process.env.PORT || 21077;
server.listen(PORT);
//server.listen(21077, function () {
 // console.log('Servidor rodando em: 21077');
//});
