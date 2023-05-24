const express = require('express');
const conectarDB = require('./config/bd');

//servidor
const app = express();
//conection ala Base Datos
conectarDB();
//middelewares
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Router
app.use('/api/taks', require('./router/task'));
app.get('/', function (req, res) {
  res.send('Hola mundo:mariposa:');
});
//Puerto
app.listen(4000, () => {
  console.log('La base de dato esta corriendo');
});