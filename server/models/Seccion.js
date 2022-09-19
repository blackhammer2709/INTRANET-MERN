const mongoose = require('mongoose');

const SeccionSchema = mongoose.Schema({

    Carrera:{
        type:String,
        required: true,
        trim: true,
    },

    Semestre:{
        type: Number,
        required:true,
        trim:true,
        default:1
    },

    Jornada:{

        type: String,
        required:true,
        trim:true,
        default:"Diurno"
    },

    Presencial:{
        type: String,
        required:true,
        default:"Presencial"
    },
    Indice:{
        type: String,
        required:true,
        default:"A"
    },

    Cantidad_Estudiantes:{
        type: Number,
        required:true,
        default:15
    }
});

module.exports = mongoose.model('Seccion', SeccionSchema);