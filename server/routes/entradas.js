const express = require('express');
const router = express.Router();
const entradasController = require('../controlador/entradasController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear entradas
// api/entradas
router.post('/',
    auth,
    [
        check('Mensaje', 'El Mensaje no puede ser un texto vacio').not().isEmpty()
    ],
    entradasController.crearEntrada
);

router.get('/',
    auth,
    entradasController.obtenerEntradas
);

router.delete('/:id',
    auth,
    entradasController.eliminarEntradas
);
module.exports = router;