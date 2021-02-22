const { Router } = require("express");
const { check } = require("express-validator");


const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido,esEmailValido} = require("../helpers/db-validators");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "el password es obligatorio y mas de 6 letras").isLength({
      min: 6,
    }),
    // check('rol','No es un rol valido').isIn(['USER_ROL', 'ADMIN_ROL']),
    check("rol").custom(esRolValido),
    check("correo", "correo no es valido").isEmail(),
    check("correo").custom(esEmailValido),
    validarCampos,
  ],
  usuariosPost
);
router.patch("/", usuariosPatch);
router.delete("/", usuariosDelete);

module.exports = router;
