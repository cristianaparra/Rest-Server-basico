const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, esEmailValido,esIdValido } = require("../helpers/db-validators");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id",[
 check('id', 'no es un id vaildo').isMongoId(),
 check('id').custom(esIdValido),
 check("rol").custom(esRolValido),
 validarCampos 
], usuariosPut);

router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "el password es obligatorio y mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "correo no es valido").isEmail(),
    check("correo").custom(esEmailValido),
    // check('rol','No es un rol valido').isIn(['USER_ROL', 'ADMIN_ROL']),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.patch("/", usuariosPatch);

router.delete("/:id",[

  check('id', 'no es un id vaildo').isMongoId(),
 check('id').custom(esIdValido),
 validarCampos
] ,usuariosDelete);

module.exports = router;
