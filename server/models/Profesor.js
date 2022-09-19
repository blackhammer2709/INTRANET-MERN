const mongoose = require('mongoose');

const ProfesorSchema = mongoose.Schema({

    Nombre:{
        type:String,
        required: true,
        trim: true,
    },

    Apellido:{
        type: String,
        required: true,
        trim: true
    },

    Tipo_Documento:{

        type: String,
        required: true,
        trim: true

    },

    Nro_Documento:{

        type: String,
        required: true,
        trim: true,
        unique: true

    },

    Tipo:{
        type: String,
        required:true,
        trim:true
    },

    Telefono:{
        type:String,
        required:true,
        trim:true
    },

    Profesion:{
        type:String,
        required:true,
        trim:true
    },

    Email:{
        type:String,
        required:true,
        trim:true
    },
    //direccion????
});

module.exports = mongoose.model('Profesor', ProfesorSchema);