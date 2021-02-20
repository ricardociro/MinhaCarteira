const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');

const app = express();
app.use(cors({ origin: '*' }));
const server = http.Server(app);

app.use(express.json());
app.use(routes);

//server.listen(3000);
const PORT = process.env.PORT || process.env.BACK_SERVER || 3000;
server.listen(21077, function () {
  console.log('Servidor rodando em: 21077');
});
