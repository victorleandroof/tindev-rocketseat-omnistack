const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const server = express();
require('dotenv/config');


server.use(cors());
server.use(express.json());
server.use(routes);

mongoose.connect(process.env.URL_MONGO || 'admin:admin@127.0.0.1:27017/tindev',{
   useNewUrlParser: true
});


server.listen(3000);