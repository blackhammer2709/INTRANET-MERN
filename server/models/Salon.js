const mongoose = require('mongoose');

const SalonSchema = mongoose.Schema({

    Nombre:{
        type:String,
        required: true,
        trim: true,
        unique:true

    },

    Capacidad:{
        type: Number,
        required:true,
        trim:true,
        default: 15
    },

    Tipo:{

        type: String,
        required: true,
        trim:true,
        default:"Aula",
    }
});

module.exports = mongoose.model('Salon', SalonSchema);