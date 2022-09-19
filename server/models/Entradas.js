const mongoose = require('mongoose');

const EntradaSchema = mongoose.Schema({

    Mensaje:{
        type:String,
        required: true,
        trim: true,

    },

    Usuario:{
        type:Object,
        default:{
            
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Usuario'
            },
            Nombre:{
                type:String,
                required:true,
                trim:true
            }
        }


    },

    fecha:{

        type: Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model('Entrada', EntradaSchema);