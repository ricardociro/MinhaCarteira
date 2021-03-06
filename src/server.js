const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');

const app = express();
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(routes);

const server = http.Server(app);

//server.listen(process.env.PORT || 3000);

server.listen(21108);
