const express = require('express'); 
const app = express();
const port = 3000;

app.get('/', (req, res) => { res.send('Mi respuesta desde express')

})
app.use(express.static(__dirname + "/public"))
app.listen(port, () => {

  console.log('servidor a su servicio en el puerto', port)
})