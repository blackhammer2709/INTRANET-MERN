const mongoose = require("mongoose");

const ClasesSchema = mongoose.Schema({

    title:{
        
        type:String,
        required:true,
        trim:true

    },
    backgroundColor:{

        type:String,
        default:"#000"

    },
    textColor:{

        type:String,
        default:"#fff"

    },
    start:{

        type:Date,
        required:true,
        default:Date.now()

    },
    end:{

        type:Date,
        required:true,
        
    },
    Profesor:{
        type:String,
        required:true,
        trim:true
    },
    Salon:{
        type: String,
        required: true,
        trim:true
    },
/*
    Carrera:{

        type: Object,
        required:true

    },
    Semestre:{

        type: Object,
        ref:'Semestre'

    },*/

    Seccion:{

        type: Object,
        required:true
    },

});

module.exports = mongoose.model('Clase', ClasesSchema);