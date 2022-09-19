const mongoose = require('mongoose');

const MensajeSchema = mongoose.Schema({

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
    Mensaje:{
        type:String,
        required: true,
        trim: true,

    },


    Fecha:{

        type: Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model('Mensaje', MensajeSchema);