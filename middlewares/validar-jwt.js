const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJwt = async (req = request, res = response, next) => {
  const tokens = req.header("x-token");
  if (!tokens) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(tokens, process.env.SECRETORPRIVATEKEY);

    //leer el usuario que corrpsonda al uid
    const usuario = await Usuario.findById(uid);


    if(!usuario){
        return res.status(401).json({
           msg: 'token no valido - usuario no existe en DB' 
        })
    }
    // verificar el estado en true
    if(!usuario.estado){
        return res.status(401).json({
           msg: 'token no valido - usuario con estado:false' 
        })
    }
    req.usuario = usuario;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "token no valido",
    });
  }
};

module.exports = {
  validarJwt,
};
