const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const {correo, nombre, img} = await googleVerify(id_token);

let usuario = await Usuario.findOne({correo});
if(!usuario){
  //crear usuario
  const data = {
    nombre,
     correo,
     password: '1',
     img,
     google:true
  }
  usuario = new Usuario(data);
  await usuario.save();
}

//si el usuario en DB
if(!usuario.estado){
  return res.status(401).json({
    msg: 'hable con el administrador, usuario blockeado'
  })
}

//generar el JWT
const token = await generarJWT(usuario.id);

 

    res.json({
      usuario,
      token
    });

  } catch (error) {
    res.status(400).json({
      msg: "token de google no es valido",
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
