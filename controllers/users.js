const { response } = require("express");

const usuariosGet = (req, res = response) => {
  res.json({
    msg: "get api - controlador",
  });
};
const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: "post api - controlador",
    nombre,
    edad
  });
};
const usuariosPut = (req, res = response) => {
  res.json({
    msg: "put api - controlador",
  });
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch api - controlador",
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete api - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
