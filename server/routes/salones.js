const express = require('express');
const router = express.Router();
const salonesController = require('../controlador/salonesController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear salon
//api/salones

router.post('/',

    auth,
    [
        check('Nombre', 'el Nombre del Salon es obligatorio').not().isEmpty(),
        check('Capacidad', 'La Capacidad del Salon es obligatorio y debe estar comprendida entre 10 y 40').isInt({min:10,max:40}),
        check('Tipo', 'Debe especificar el Tipo del Salon').not().isEmpty(),
    ],
    salonesController.crearSalon

)

//obtener salones
router.get('/',
    auth,
    salonesController.obtenerSalones
)

//actualizar

router.put('/:id',
    auth,
    [
        check('Nombre', 'el Nombre del Salon es obligatorio').not().isEmpty(),
        check('Capacidad', 'La Capacidad del Salon es obligatorio y debe estar comprendida entre 10 y 40').isInt({min:10,max:40}),
        check('Tipo', 'Debe especificar el Tipo del Salon').not().isEmpty(),
    ],
    salonesController.actualizarSalon
)

router.delete('/:id',
    auth,
    salonesController.eliminarSalon
)
module.exports = router;

