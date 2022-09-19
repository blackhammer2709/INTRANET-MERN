const Seccion = require('../models/Seccion');
const {validationResult} = require('express-validator');

exports.crearSeccion = async (req, res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        const {Carrera, Semestre, Jornada, Presencial, Indice, Cantidad_Estudiantes} = req.body;

        const existeseccion = await Seccion.findOne({Carrera:Carrera, Semestre:Semestre, Indice:Indice});
        if(existeseccion){
            return res.status(400).json({msg:'La seccion ya existe'});
        }

        //crear seccion

        const seccion = new Seccion({Carrera:Carrera, Semestre:Semestre, Jornada:Jornada, Presencial:Presencial, Indice:Indice, Cantidad_Estudiantes:Cantidad_Estudiantes});
        await seccion.save();
        res.json({seccion});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.obtenerSecciones = async (req, res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        const secciones = await Seccion.find({});
        res.json({secciones});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.actualizarSeccion = async (req, res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        const {Carrera, Semestre, Jornada, Presencial, Indice,Cantidad_Estudiantes} = req.body;
        const nuevaSeccion ={};

        const existeseccion = await Seccion.findOne({_id:{$ne:req.params.id}, Carrera:Carrera, Semestre:Semestre, Indice:Indice});
        if(existeseccion){
            return res.status(400).json({msg:'La seccion ya existe'});
        }

        if (Carrera && Semestre && Jornada && Presencial && Indice && Cantidad_Estudiantes) {
            
            nuevaSeccion.Carrera=Carrera;
            nuevaSeccion.Semestre=Semestre;
            nuevaSeccion.Jornada=Jornada;
            nuevaSeccion.Presencial=Presencial;
            nuevaSeccion.Indice=Indice;
            nuevaSeccion.Cantidad_Estudiantes=Cantidad_Estudiantes;

        }

        //revisar id

        let seccion =await Seccion.findById(req.params.id);

        //seccion existe

        if(!seccion){

            return res.status(404).json({msg:'Seccion no Encontrada'});

        }

        //actualizar

        seccion = await Seccion.findByIdAndUpdate({_id:req.params.id}, nuevaSeccion, {new:true});
        res.json({seccion});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.eliminarSeccion = async (req, res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        //revisar id
        let seccion = await Seccion.findById(req.params.id);

        //seccion existe

        if(!seccion){
            return res.status(404).json({msg:'Seccion no Encontrada'});
        }

        //eliminar

        await Seccion.findByIdAndDelete({_id:req.params.id});
        res.json({msg:'Seccion eliminada'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}