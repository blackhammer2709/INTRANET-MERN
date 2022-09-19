const Materia = require('../models/Materia');
const {validationResult} = require('express-validator');

exports.crearMateria = async (req,res) =>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    const {Codigo, Prelacion} =req.body;

    try {

        const existemateria = await Materia.findOne({Codigo});
        if(existemateria){
            return res.status(400).json({msg:'la Materia ya existe'});
        }

        if(Prelacion.trim() !== "S/P"){
            
            const existeprelacion = await Materia.findOne({Codigo:Prelacion});
            if(!existeprelacion){
                return res.status(404).json({msg:'La prelacion no existe'})
            }
        }
        //validar la prelacion
        //crear materia

        const materia = new Materia({
            Codigo:req.body.Codigo,
            Nombre:req.body.Nombre,
            UC:req.body.UC,
            HT:req.body.HT,
            HP:req.body.HP,
            HL:req.body.HL,
            Semestre:req.body.Semestre,
            Prelacion:req.body.Prelacion,
        });
        await materia.save();
        res.json({materia});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerMaterias = async (req, res)=>{

    //revisar errores

    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        const materias = await Materia.find({});
        res.json({materias});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.actualizarMateria = async (req,res)=>{
    
    //revisar por errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        const {Codigo, Nombre, UC, HT, HP, HL, Semestre, Prelacion} = req.body;
        const nuevaMateria ={};


        const existemateria = await Materia.findOne({_id:{$ne:req.params.id},Codigo:Codigo});
        if(existemateria){
            return res.status(400).json({msg:'la Materia ya existe'});
        }

        if(Prelacion.trim() !== "S/P"){
            
            const existeprelacion = await Materia.findOne({Codigo:Prelacion});
            if(!existeprelacion){
                return res.status(404).json({msg:'La prelacion no existe'})
            }
        }

        if(Codigo && Nombre && Semestre && Prelacion){
            nuevaMateria.Codigo = Codigo;
            nuevaMateria.Nombre = Nombre;
            nuevaMateria.UC = UC;
            nuevaMateria.HT = HT;
            nuevaMateria.HP = HP;
            nuevaMateria.HL = HL;
            nuevaMateria.Semestre = Semestre;
            nuevaMateria.Prelacion = Prelacion;
        }

        else{
            return res.status(404).json({msg:'Todos los campos son obligatorios'})
        }

        //revisar id
        let materia = await Materia.findById(req.params.id);

        //materia existe

        if(!materia){
            return res.status(404).json({msg:'Materia no encontrada'});
        }

        //actualizar

        materia = await Materia.findByIdAndUpdate({_id:req.params.id}, nuevaMateria, {new:true});
        res.json({materia});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.eliminarMateria = async (req, res)=>{

    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({errores: errores.array()});
    
    }

    try {

        //revisar id

        let materia = await Materia.findById(req.params.id);

        //materia existe

        if(!materia){
            return res.status(404).json({msg:'Materia no Encontrada'});
        }

        //eliminar

        await Materia.findByIdAndDelete({_id:req.params.id});
        res.json({msg:'Materia Eliminada'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}