const Carrera = require('../models/Carrera');
const {validationResult} = require('express-validator');
exports.crearCarrera = async (req, res) =>{
    

    //revisar si ya existe la carrera
    
    try {
        
        const {Nombre, Duracion} = req.body;
        console.log(Nombre);
        const existecarrera = await Carrera.findOne({Nombre});
        if(existecarrera){
            return res.status(400).json({msg:'La Carrera ya Existe'});
        }

        //crear carrera

        const carrera = new Carrera({Nombre:Nombre, Duracion:Duracion});
        
        await carrera.save();
        res.json({carrera});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerCarrera = async (req, res) =>{

    try {

        const carreras = await Carrera.find({});
        res.json({carreras});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarCarrera = async (req, res) =>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }
    
    
    try {

        

        const {Nombre, Duracion} = req.body;
        const nuevaCarrera ={};

        const existecarrera = await Carrera.findOne({_id:{$ne:req.params.id}, Nombre:Nombre});
        if(existecarrera){
            return res.status(400).json({msg:'La Carrera ya Existe'});
        }
    
        if(Nombre && Duracion){
            nuevaCarrera.Nombre = Nombre;
            nuevaCarrera.Duracion = Duracion;
        }
    
        else{
            return res.status(404).json({msg:"Debe Ingresar Nombre y Duracion"});
        }

        //revisar id

        let carrera = await Carrera.findById(req.params.id);

        //carrera existe

        if(!carrera){
            return res.status(404).json({msg:'Carrera no Encontrada'})
        }

        //actualizar

        carrera = await Carrera.findByIdAndUpdate({_id:req.params.id},nuevaCarrera,{new:true});
        res.json({carrera})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarCarrera = async (req, res)=>{
    
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }
    
    
    try {

        //revisar id

        let carrera = await Carrera.findById(req.params.id);

        //carrera existe

        if(!carrera){
            return res.status(404).json({msg:'Carrera no Encontrada'})
        }

        //eliminar

        await Carrera.findByIdAndDelete({_id: req.params.id});
        res.json({msg: 'Carrera Eliminada'});

    } catch (error) {
        console.log(error)
        return res.status(500).send('Hubo un error');
    }
}