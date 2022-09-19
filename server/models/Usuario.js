const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({

    Nombre:{
        type: String,
        required: true,
        trim: true

    },
    Cedula:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    Clave:{
        type: String,
        required: true,
        trim: true,
    },
    Fecha_registro:{

        type: Date,
        default: Date.now()
    },
    activo:{
        type:Number,
        default:0

    },
    Admin:{
        type:Boolean
    }

});

module.exports = mongoose.model('Usuario', UsuariosSchema);