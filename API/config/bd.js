
const mongoose = require('mongoose');
ngoose = require('mongoose');
require('dotenv').config({ path: 'variable.env' });

const conectarBD = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarBD;
