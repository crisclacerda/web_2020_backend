const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
// permite usar duas portas ou mais (servidor):
const cors = require('cors');
require('dotenv').config()

const apiRouter = require("./routers");


const app = express();
//utilizando a porta atual que está contida no arquivo ".env" deste projeto:
const port = process.env.PORT;

app.use(express.json()); // for parsing application/json
// o express inicializa o node:
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));
app.use(cors());

// abaixo, havendo qualquer requisição para /produtos no servidor, esta deve ser direcionada para o routers_server,
// utilizando a api do backend dedicada aos produtos:

app.use('/api', apiRouter);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
// cria um admin
const authService = require('./services/auth.service'); 
authService.signup('admin', 'admin', '', '', '', '', '', true);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});