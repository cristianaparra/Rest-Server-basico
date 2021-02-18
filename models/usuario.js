

const { Schema, model}= require('mongoose')


const UsuarioSchema= Schema({
    nombre:{
        type: String,
        require:[ture, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require:[ture, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require:[ture, 'La contraseña es obligatorio']
    },
    url:{
        type: String
    },
    rol:{
        type: String,
        require:true,
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:true
    }


})


module.exports= model('Usuarios',UsuarioSchema);
