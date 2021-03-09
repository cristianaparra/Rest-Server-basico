const { response } = require("express");
const { Categoria } = require("../models");

//obtenerCategorias - paginado - total - populate

//obtenerCategoria  populate{regresa el objeto de la categoria}


const crearCategorias = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });

    //generar la data a guardar
  }
  const data = {
    nombre, 
    usuario: req.usuario._id
  };

const categoria = new Categoria(data);

await categoria.save();
res.status(201).json(categoria)

};

//actualizarCategoria 

//borrarCategoria -estado: false

module.exports = {
  crearCategorias
};
