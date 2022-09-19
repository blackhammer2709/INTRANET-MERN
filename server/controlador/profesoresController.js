const Profesor = require('../models/Profesor');
const {validationResult} = require('express-validator');

exports.crearProfesor = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    const {Nombre,
        Apellido,
        Tipo_Documento,
        Nro_Documento,
        Tipo,
        Telefono,
        Profesion,
        Email} = req.body;

    try {

        const existecedula = await Profesor.findOne({Nro_Documento:Nro_Documento});

        if(existecedula){
            return res.status(400).json({msg:'La Cedula ya fue ingresada'});
        }

        //crear profesor

        const profesor = new Profesor({
            Nombre:Nombre,
            Apellido:Apellido,
            Tipo_Documento:Tipo_Documento,
            Nro_Documento:Nro_Documento,
            Tipo: Tipo,
            Telefono:Telefono,
            Profesion:Profesion,
            Email:Email
        });
        await profesor.save();
        res.json({profesor});

        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.obtenerProfesores = async (req, res) =>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        console.log(errores.array())

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        const profesores = await Profesor.find({});
        res.json({profesores});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.actualizarProfesor = async(req,res) =>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        const {
            Nombre,
            Apellido,
            Tipo_Documento,
            Nro_Documento,
            Tipo,
            Telefono,
            Profesion,
            Email
        } = req.body;

        const nuevoProfesor ={};
        const existecedula = await Profesor.findOne({_id:{$ne:req.params.id},Nro_Documento:Nro_Documento});

        if(existecedula){
            return res.status(400).json({msg:'La Cedula ya fue ingresada'});
        }
        
        if (Nombre && Apellido && Tipo_Documento && Nro_Documento && Tipo && Telefono && Profesion && Email){
            
            nuevoProfesor.Nombre=Nombre;
            nuevoProfesor.Apellido=Apellido;
            nuevoProfesor.Tipo_Documento=Tipo_Documento;
            nuevoProfesor.Nro_Documento=Nro_Documento;
            nuevoProfesor.Tipo=Tipo;
            nuevoProfesor.Telefono=Telefono;
            nuevoProfesor.Profesion=Profesion;
            nuevoProfesor.Email=Email;
        }
        else{
            return res.status(404).json({msg:"Sin informacion nueva para actualizar"})
        }

        //revisar id
        let profesor = await Profesor.findById(req.params.id);

        //profesor existe

        if(!profesor){
            return res.status(404).json({msg:'Profesor no existe'})
        }

        //actualizar
        profesor = await Profesor.findByIdAndUpdate({_id:req.params.id}, nuevoProfesor, {new:true});
        res.json({profesor});

    } catch (error) {
        console.log(error)
        return res.status(500).send('Hubo un error');
    }
}

exports.eliminarProfesor = async (req, res) =>{

    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }
    
    try {
        
        //revisar id

        let profesor = await Profesor.findById(req.params.id);

        //profesor existe

        if(!profesor){
            return res.status(404).json({msg:'Profesor no Encontrado'})
        }

        //eliminar

        await Profesor.findByIdAndDelete({_id:req.params.id});
        res.json({msg:'Profesor Eliminado'});
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}