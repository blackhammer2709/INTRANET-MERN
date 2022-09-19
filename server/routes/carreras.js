const express = require('express');
const router = express.Router();
const carrerasController = require('../controlador/carrerasController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear carrera
//api/carreras
router.post('/',
    auth,
    [
        check('Nombre', 'el Nombre de la carrera es obligatorio').not().isEmpty(),
        check('Duracion', 'la Duracion de la carrera debe estar entre 5 y 9 semestres').isInt({min:5,max:9})
    ],
    carrerasController.crearCarrera
    
);

//obtener carrera

router.get('/',

    auth,
    carrerasController.obtenerCarrera

);

//actualizar
router.put('/:id',

    auth,
    [
        check('Nombre', 'el Nombre de la carrera es obligatorio').not().isEmpty(),
        check('Duracion', 'la Duracion de la carrera debe estar entre 5 y 9 semestres').isInt({min:5,max:9})
    ],
    carrerasController.actualizarCarrera

)

router.delete('/:id',

    auth,
    carrerasController.eliminarCarrera
    
)


module.exports = router;