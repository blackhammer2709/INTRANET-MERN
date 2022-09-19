const Salon = require('../models/Salon');
const {validationResult} = require('express-validator');


exports.crearSalon = async (req, res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        //verificar

        const {Nombre, Tipo, Capacidad} = req.body;
        const existesalon = await Salon.findOne({Nombre:Nombre});
        
        if(existesalon){
            return res.status(400).json({msg:'El salon ya existe'});
        }

        //crear salon

        const salon = new Salon({Nombre:Nombre, Tipo:Tipo, Capacidad:Capacidad});
        await salon.save();
        res.json({salon});

    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }

}

exports.obtenerSalones = async (req, res)=>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        const salones = await Salon.find({});
        res.json({salones});

    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }

}

exports.actualizarSalon = async (req, res)=>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        const {Nombre, Capacidad, Tipo} = req.body;

        const nuevoSalon ={};

        const existesalon = await Salon.findOne({_id:{$ne:req.params.id},Nombre:Nombre});
        
        if(existesalon){
            return res.status(400).json({msg:'El salon ya existe'});
        }

        if(Nombre && Capacidad && Tipo){
            
            nuevoSalon.Nombre=Nombre;
            nuevoSalon.Capacidad=Capacidad;
            nuevoSalon.Tipo=Tipo;

        }

        //revisar id

        let salon = await Salon.findById(req.params.id);

        //salon existe

        if(!salon){
            return res.status(404).json({msg:'Salon no Encontrado'});
        }

        //actualizar

        salon = await Salon.findByIdAndUpdate({_id:req.params.id}, nuevoSalon,{new:true});
        res.json({salon});

    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }

}

exports.eliminarSalon = async (req, res)=>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        //revisar id

        let salon = await Salon.findById(req.params.id);

        //salon existe

        if(!salon){
            return res.status(404).json({msg:'Salon no Encontrado'});
        }

        //eliminar
        await Salon.findByIdAndDelete({_id:req.params.id});
        res.json({msg:' Salon Eliminado'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }

}