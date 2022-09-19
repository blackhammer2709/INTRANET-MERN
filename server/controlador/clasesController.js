const Clase = require('../models/Clase');
const {validationResult} = require('express-validator');

exports.crearClase = async (req, res) =>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {
        //extraer comienzo y final de clase asi como el docente y el aula del req
        const {start, end, Profesor, Salon} = req.body;
        //se consulta las clases ya en la bd
        const comparacion = await Clase.find({});
        const nuevoI= new Date(start);
        const nuevoF= new Date(end);

        //validar que la clase no comienze despues de terminar
        if(nuevoI>=nuevoF){

            return res.status(401).json({msg:'El final de la clase no puede ser antes o al mismo tiempo que el comienzo'})
        }

        let error="";
        
        //validar que las clases no se solapen
        comparacion.forEach(clase => {

            const comienzo = new Date(clase.start);
            const final = new Date(clase.end);
            
            if(nuevoI.getDay()===comienzo.getDay()){
            
                if((nuevoF <= comienzo || nuevoI >= final) || (Profesor!==clase.Profesor && Salon!==clase.Salon)){

                    console.log(`${req.body.title} no se solapa con ${clase.title}`)
                }

                else{
                    
                    error=`ERROR: ${req.body.title} SE SOLAPA CON ${clase.title}. LAS HORAS NO PUEDEN SOLAPARSE Y DE SER ASI NO PUEDEN TENER EL MISMO PROFESOR Y SALON`;
                
                }

            }
        });

        if(error.trim()!==""){
            return res.status(401).json({msg:error})
        }

        //crear clase
        const clase = new Clase(req.body);
        await clase.save();
        res.json({clase});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.obtenerClases = async (req, res) =>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        const {Seccion} = req.body
        const clases = await Clase.find({Seccion:Seccion});

        res.json({clases})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.actualizarClase = async (req, res) =>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        const {title, backgroundColor, textColor, start, end, Profesor, Salon, Seccion} = req.body;
        const nuevaClase={};

        
        if(title && backgroundColor && textColor && start && end && Profesor && Salon && Seccion){
            nuevaClase.title=title;
            nuevaClase.backgroundColor=backgroundColor;
            nuevaClase.textColor=textColor;
            nuevaClase.start=start;
            nuevaClase.end=end;
            nuevaClase.Profesor=Profesor;
            nuevaClase.Salon=Salon;
            nuevaClase.Seccion=Seccion;
        }

        else{
            return res.status(404).json({msg:"No puede dejar un campo vacio"})
        }
        
        //revisar id

        let clase = await Clase.findById(req.params.id);

        //clase existe

        if(!clase){
            return res.status(404).json({msg:"Clase no Encontrada"});
        }

        //revisar solapamiento

        const comparacion = await Clase.find({_id:{$ne:req.params.id}});
        const inicioAct= new Date(nuevaClase.start);
        const finalAct= new Date(nuevaClase.end);

        //validar que la clase no comienze despues de terminar
        if(inicioAct>=finalAct){

            return res.status(401).json({msg:'El final de la clase no puede ser antes o al mismo tiempo que el comienzo'})
        }

        let error="";
        
        //validar que las clases no se solapen
        comparacion.forEach(clase => {

            const comienzo = new Date(clase.start);
            const final = new Date(clase.end);
            
            if(inicioAct.getDay()===comienzo.getDay()){
            
                if((finalAct <= comienzo || inicioAct >= final) || (nuevaClase.Profesor!==clase.Profesor && nuevaClase.Salon!==clase.Salon)){

                    console.log(`${req.body.title} no se solapa con ${clase.title}`)
                }

                else{
                    
                    error=`ERROR: ${req.body.title} SE SOLAPA CON ${clase.title}. LAS HORAS NO PUEDEN SOLAPARSE Y DE SER ASI NO PUEDEN TENER EL MISMO PROFESOR Y SALON`;
                
                }

            }
        });

        if(error.trim()!==""){
            return res.status(401).json({msg:error})
        }

        else{
            clase = await Clase.findByIdAndUpdate({_id:req.params.id}, nuevaClase,{new:true});
            res.json({nuevaClase});

        }


    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.eliminarClase = async (req, res) =>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() });
    }

    try {

        //revisar id

        let clase = await Clase.findById(req.params.id);

        //clase existe

        if(!clase){
            return res.status(404).json({msg:'Clase no Encontrada'})
        }

        //eliminar

        await Clase.findByIdAndDelete({_id:req.params.id});
        res.json({msg:'Clase eliminada'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}