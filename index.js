const express = require('express');
const conectarDB = require('./API/config/bd');

//servidor
const app = express();
const port = 3000;


app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
//conection ala Base Datos
conectarDB();
//middelewares
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Router
app.use('/api', require('./API/router/task'));
app.get('/', function (req, res) {
  res.send('Hola mundo:mariposa:');
});
//Puerto
app.listen(4000, () => {
  console.log('La base de dato esta corriendo');
});