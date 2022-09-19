const express = require('express');
const router = express.Router();
const materiasController = require('../controlador/materiasController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear materia
//api/materias

router.post('/',

    auth,
    [
        check('Codigo', 'El Codigo de la Materia es Obligatorio').not().isEmpty(),
        check('Nombre', 'El Nombre de la Materia es Obligatorio').not().isEmpty(),
        check('Semestre', 'El semestre al que corresponde la materia debe estar comprendido entre 1 y 9').isInt({min:1, max:9}),
    ],
    materiasController.crearMateria

);

router.get('/',

    auth,
    materiasController.obtenerMaterias

);

router.put('/:id',

    auth,
    [
        check('Codigo', 'El Codigo de la Materia es Obligatorio').not().isEmpty(),
        check('Nombre', 'El Nombre de la Materia es Obligatorio').not().isEmpty(),
        check('Semestre', 'El semestre al que corresponde la materia debe estar comprendido entre 1 y 9').isInt({min:1, max:9}),
    ],
    materiasController.actualizarMateria
);

router.delete('/:id',

    auth,
    materiasController.eliminarMateria
);
module.exports = router;