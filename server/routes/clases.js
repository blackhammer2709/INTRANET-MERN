const express = require('express');
const router = express.Router();
const clasesController = require('../controlador/clasesController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear clases
//api/clases
router.post('/',
    auth,
    [
        check("title","La materia de la clase es obligatoria").not().isEmpty(),
        check("end","el final de la clase debe ser una fecha valida").isDate(),
        check("Profesor","el Profesor de la Clase es obligatorio").not().isEmpty(),
        check("Salon","el Salon de la Clase es obligatorio").not().isEmpty(),
        check("Seccion","La seccion debe contener los datos Carrera, Semestre").not().isEmpty(),
        check("Seccion","La seccion debe contener los datos Carrera, Semestre").isObject(),
        
    ],
    clasesController.crearClase
    
);

//obtener clases

router.get('/',

    auth,
    clasesController.obtenerClases

);

//actualizar
router.put('/:id',

    auth,
    [
        check("title","La materia de la clase es obligatoria").not().isEmpty(),
        check("start","el comienzo de la clase debe ser una fecha valida").isDate(),
        check("end","el final de la clase debe ser una fecha valida").isDate(),
        check("Profesor","el Profesor de la Clase es obligatorio").not().isEmpty(),
        check("Salon","el Salon de la Clase es obligatorio").not().isEmpty(),
        check("Seccion","La seccion debe contener los datos Carrera, Semestre").not().isEmpty(),
        check("Seccion","La seccion debe contener los datos Carrera, Semestre").isObject(),
        
    ],
    clasesController.actualizarClase

)

router.delete('/:id',

    auth,
    clasesController.eliminarClase
    
)


module.exports = router;