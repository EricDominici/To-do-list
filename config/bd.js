const mongoose = require('mongoose');
require('dotenv').config({path: 'variable.env'})
const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Bases de dato conectada");
    } catch (error) {
        console.log(error);
        process.exit(1);//detenemos la app
    }
}
module.exports = conectarBD;