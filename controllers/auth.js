const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar sai el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }
    //si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado:false",
      });
    }

    //vetrificar la constraseña

    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - pasword",
      });
    }

    //generar jwt


    
    res.json({
      msg: "Login Ok",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
