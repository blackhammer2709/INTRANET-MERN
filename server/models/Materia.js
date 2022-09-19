const mongoose = require("mongoose");

const MateriasSchema = mongoose.Schema({

    Codigo:{

        type: String,
        required: true,
        trim:true,
        unique:true

    },
    Nombre:{
        type: String,
        required: true,
        trim: true,
        unique:true

    },
    UC:{
        type: Number,
        trim: true,
        default: 0
    },
    HT:{
        type: Number,
        trim: true,
        default: 0
    },
    HP:{
        type: Number,
        trim: true,
        default: 0
    },
    HL:{
        type: Number,
        trim: true,
        default: 0
    },
    Semestre:{
        type: Number,
        trim: true,
        default: 0

    },
    Prelacion:{
        type: String,
        default:"S/P",
        trim:true
    }

});
module.exports = mongoose.model('Materia', MateriasSchema);