const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategorias } = require("../controllers/categorias");

const { validarCampos, validarJWT } = require("../middlewares");

const router = Router();

// {{url}}/api/categorias

// obtener todas las categorias - publico
router.get("/", (req, res) => {
  res.json("get");
});
// obtener una categoria por id - publico
//hacer validacion midelwate personalizado con custom
router.get("/:id", (req, res) => {
  res.json("get - ID");
});

// crear categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    validarCampos
  ],
  crearCategorias
);

// actualizar - privado - cualquier persona con un token valido
router.put("/:id", (req, res) => {
  res.json("put");
});

// borrar una categoria -Admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
