const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) =>{
    
    //extraer datos

    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    const {Cedula, Clave} = req.body;


    try {
        let usuario = await Usuario.findOne({ Cedula });

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }
        //crea usuario

        usuario = new Usuario(req.body);

        //hashear
        const salt = await bcryptjs.genSalt(10);

        usuario.Clave = await bcryptjs.hash(Clave, salt);
        //guarda usuario

        await usuario.save();
        res.json({usuario})
        
    } catch (error) {
        console.log(error);
        res.status(400).send("hubo un error");

    }
}

exports.obtenerUsuarios = async (req, res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        const usuarios = await Usuario.find({});
        res.json({usuarios})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un Error')
    }
}

exports.actualizarUsuario = async (req, res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        const {Nombre, Cedula, Clave} = req.body;
        const nuevoUsuario={};

        let existeusuario = await Usuario.findOne({ Cedula });

        if(existeusuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }

        if(Nombre && Cedula && Clave){
            nuevoUsuario.Nombre=Nombre;
            nuevoUsuario.Cedula=Cedula;
            nuevoUsuario.Clave=Clave;
        }

        else{
            return res.status(404).json({msg:'No debe ingresar datos vacios'});
        }

        //revisar id

        let usuario = await Usuario.findById(req.params.id);

        //usuario existe

        if(!usuario){
            return res.status(404).json({msg:'Usuario no existe'});
        }

        //actualizar

        usuario = await Usuario.findByIdAndUpdate({_id:req.params.id}, nuevoUsuario, {new:true});
        res.json({usuario});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un Error')
    }
}

exports.eliminarUsuario = async (req, res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        //revisar id
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario){
            return res.status(404).json({msg:'Usuario no existe'});
        }

        //eliminar

        await Usuario.findByIdAndDelete({_id:req.params.id});
        res.json({msg:'Usuario Eliminado'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un Error')
    }
}