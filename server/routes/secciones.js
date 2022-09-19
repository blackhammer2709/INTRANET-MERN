const express = require('express');
const router = express.Router();
const seccionesController = require('../controlador/seccionesController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear seccion
//api/secciones

router.post('/',
    auth,
    [
        check('Carrera', 'La Carrera de la Seccion es Obligatoria').not().isEmpty(),
        check('Semestre', 'el Semestre de la Seccion debe ser un Entero').isInt(),
        check('Jornada', 'La Jornada de la Seccion es Obligatoria').not().isEmpty(),
        check('Presencial', 'Debe especificar el Numero de Documento').not().isEmpty(),
        check('Indice', 'El Indice de la Seccion es Obligatoria').not().isEmpty(),
        check('Cantidad_Estudiantes', 'El numero de estudiantes debe ser un entero').isInt()
    ],
    seccionesController.crearSeccion
    
);

//obtener carrera

router.get('/',

    auth,
    seccionesController.obtenerSecciones

);

//actualizar
router.put('/:id',

    auth,
    [
        check('Carrera', 'La Carrera de la Seccion es Obligatoria').not().isEmpty(),
        check('Semestre', 'el Semestre de la Seccion debe ser un Entero').isInt(),
        check('Jornada', 'La Jornada de la Seccion es Obligatoria').not().isEmpty(),
        check('Presencial', 'Debe especificar el Numero de Documento').not().isEmpty(),
        check('Indice', 'El Indice de la Seccion es Obligatoria').not().isEmpty(),
        check('Cantidad_Estudiantes', 'El numero de estudiantes debe ser un entero').isInt()
    ],
    seccionesController.actualizarSeccion

)

router.delete('/:id',

    auth,
    seccionesController.eliminarSeccion
    
)


module.exports = router;