const mongoose = require("mongoose");

const CarrerasSchema = mongoose.Schema({

    Nombre:{
        type: String,
        required: true,
        trim: true,
        unique:true

    },
    Duracion:{
        type: Number,
        required: true,
        trim: true,
    },

});

module.exports = mongoose.model('Carrera', CarrerasSchema);