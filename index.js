const express = require('express');
const conectarDB = require('./API/config/bd');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});

conectarDB();

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api', require('./API/router/task'));
app.use('/api/auth', require('./API/router/AthRuter'));
app.get('/', function (req, res) {
  res.send('Hola mundo:mariposa:');
});

app.listen(4000, () => {
  console.log('La base de dato esta corriendo');
});