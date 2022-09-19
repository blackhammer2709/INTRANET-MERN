const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'})

const conectarDB = async()=>{

    try {
        await mongoose.connect(process.env.Local, {

            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log("base de datos conectada");

    } catch (error) {
        console.log(error);
        process.exit(1);//detiene la app
    }
}

module.exports = conectarDB;