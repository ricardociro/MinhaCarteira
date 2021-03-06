const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
//const http = require('http');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(routes);

//const server = http.Server(app);

app.listen(process.env.PORT || 21077);

