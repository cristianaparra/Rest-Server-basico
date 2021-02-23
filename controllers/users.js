const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { id, q } = req.query;

  res.json({
    msg: "get api - controlador",
    id,
    q,
  });
};
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar la pass
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en BD

  await usuario.save();

  res.json({
    usuario
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findOneAndUpdate(id, resto);
  res.json({
    msg: "put api - controlador",
    id,
    usuario
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
