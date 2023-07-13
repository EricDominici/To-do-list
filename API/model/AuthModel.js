const mongoose = require("mongoose");
const User = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require:true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", User);
