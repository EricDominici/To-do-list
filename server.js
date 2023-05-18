const express = require('express'); 
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const user = 'diamondblack';
const password = 'vwagHiaOvTNRGNce';
const uri = `mongodb+srv://${user}:${password}@cluster0.lgzllao.mongodb.net/`;

mongoose.connect(uri,

  {useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))
git 
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));


app.get('/', (req, res) => { res.send('Mi respuesta desde express')

})
app.use(express.static(__dirname + "/public"))
app.listen(port, () => {

  console.log('servidor a su servicio en el puerto', port)
})