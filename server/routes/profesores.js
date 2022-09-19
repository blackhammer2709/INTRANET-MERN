const express = require('express');
const router = express.Router();
const profesoresController = require('../controlador/profesoresController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear profesor
//api/profesores

router.post('/',

    auth,
    [
        check('Nombre', 'el Nombre del Profesor es obligatorio').not().isEmpty(),
        check('Apellido', 'el Apellido del Profesor es obligatorio').not().isEmpty(),
        check('Tipo_Documento', 'Debe especificar el Tipo de Documento').not().isEmpty(),
        check('Nro_Documento', 'Debe especificar el Numero de Documento').not().isEmpty(),
        check('Tipo', 'el Tipo de Dedicacion del Profesor es obligatorio').not().isEmpty(),
        check('Telefono', 'el Telefono del Profesor es obligatorio').not().isEmpty(),
        check('Profesion', 'La Profesion del Profesor es obligatorio').not().isEmpty(),
        check('Email', 'el Correo del Profesor es obligatorio').not().isEmpty(),
    ],
    profesoresController.crearProfesor

);

router.get('/',

    auth,
    profesoresController.obtenerProfesores

);

router.put('/:id',

    auth,
    [
        check('Nombre', 'el Nombre del Profesor es obligatorio').not().isEmpty(),
        check('Apellido', 'el Apellido del Profesor es obligatorio').not().isEmpty(),
        check('Tipo_Documento', 'Debe especificar el Tipo de Documento').not().isEmpty(),
        check('Nro_Documento', 'Debe especificar el Numero de Documento').not().isEmpty(),
        check('Tipo', 'el Tipo de Dedicacion del Profesor es obligatorio').not().isEmpty(),
        check('Telefono', 'el Telefono del Profesor es obligatorio').not().isEmpty(),
        check('Profesion', 'La Profesion del Profesor es obligatorio').not().isEmpty(),
        check('Email', 'el Correo del Profesor es obligatorio').not().isEmpty(),
    ],
    profesoresController.actualizarProfesor

);

router.delete('/:id',

    auth,
    profesoresController.eliminarProfesor

);

module.exports = router;