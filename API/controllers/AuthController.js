const userModel = require("../model/AuthModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { email, password, name, lastName } = req.body;
    const isUser = await userModel.findOne({ email });
    const encyptPassword = await bcrypt.hash(password, 8);

    if (isUser) {
      return res.status(409).send("USER_ALREADY_REGISTER");
    }

    const auth = new userModel({
      email,
      password: encyptPassword,
      name,
      lastName,
    });

    // Creamos nuevo usuario.
    await auth.save();
    res.send(auth);
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if(!user){
      return res.status(409).send("User not found")
    }
    //comparacion de password con el de la base de dato
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(500).send("password incorrect");
    }
      res.send({data: user,})
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};
