const Entrada = require('../models/Entradas');
const {validationResult}= require('express-validator');

exports.crearEntrada = async (req, res) =>{
    

    try {
        const entrada = new Entrada(req.body);
        
        //guardar el creador del mensaje a traves de jwt
        entrada.Usuario = {
            id:req.usuario.id,
            Nombre:req.usuario.Nombre
        }
        //guardar entrada
        entrada.save();
        res.json(entrada)
        
    } catch (error) {
        
        console.log(error);
        res.status(500).send('hubo un error')
        
    }
}

//obtener entradas

exports.obtenerEntradas = async (req, res) =>{

    try {

        const entradas = await Entrada.find({});
        res.json({entradas});
        
    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un Error');
        
    }
}

//eliminar entrada

exports.eliminarEntradas = async (req, res) =>{

    try {

        //revisar id
        let entrada = await Entrada.findById(req.params.id);
        
        //el proyecto existe o no
        
        if(!entrada){
            return res.status(404).json({msg:'Entrada no existe'})
        }

        //verificar creador de entrada/mensaje

        if(entrada.Usuario.id.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'})
        }
        //eliminar
        await Entrada.findOneAndDelete({_id: req.params.id});
        res.json({msg:'Entrada eliminada'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el Servidor");
    }
}