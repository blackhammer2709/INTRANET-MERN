const Mensaje = require('../models/Mensaje');
const {validationResult}= require('express-validator');

exports.crearMensaje = async (req, res) =>{

    try {
        
        const mensaje = new Mensaje(req.body);

        //guardar el creador del mensaje con jwt

        mensaje.Usuario = {
            id:req.usuario.id,
            Nombre:req.usuario.Nombre
        };

        //guardar mensaje
        mensaje.save();
        res.json(mensaje);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.obtenerMensajes = async (req, res) =>{

    try {

        const mensajes = await Mensaje.find({});
        res.json({mensajes});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}