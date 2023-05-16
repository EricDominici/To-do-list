const express = require('express'); 
const app = express();
const port = 3000;
/*conexion base de datos
const mongoose = require('mongoose');
const user = '';
const password = '';
const uri = '';

mongoose.connect('mongodb://127.0.0.1:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
*/

app.get('/', (req, res) => { res.send('Mi respuesta desde express')

})
app.use(express.static(__dirname + "/public"))
app.listen(port, () => {

  console.log('servidor a su servicio en el puerto', port)
})