const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    const {Cedula, Clave} = req.body;

    try {

        //revisar usuario registrado

        let usuario = await Usuario.findOne({Cedula});

        if(!usuario){
            return res.status(400).json({msg:"usuario no existe"})
        }

        const passCorrecto = await bcryptjs.compare(Clave, usuario.Clave);

        if (!passCorrecto){

            return res.status(400).json({msg:"clave incorrecto"})

        }

        //si todo es correcto crear y firmar jwt

        const payload ={
            
            usuario:{
            
                id:usuario.id,
                Nombre:usuario.Nombre
            
            }
        
        };
        
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 86400
        }, (error, token) =>{
            
            if(error) throw error;
        
            //mensaje de confirmacion
            
            res.json({ token })
        
        });
        
    } catch (error) {
        console.log(error);
    }
}

exports.usuarioAutenticado = async (req, res)=>{

    try {

        const usuario = await Usuario.findById(req.usuario.id).select('-Clave');
        res.json({usuario})        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}