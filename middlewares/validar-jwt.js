const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validarJwt = (req = request, res = response, next) => {
  const tokens = req.header("x-token");
  if (!tokens) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {

   const {uid}= jwt.verify(tokens, process.env.SECRETORPRIVATEKEY)

 req.uid = uid;


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
