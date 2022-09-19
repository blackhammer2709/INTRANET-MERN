const express = require('express');
const router = express.Router();
const mensajesController = require('../controlador/mensajesController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear mensajes
// api/mensajes

router.post('/',

    auth,
    [
        check('Mensaje', 'El Mensaje no puede ser un texto vacio').not().isEmpty()
    ],
    mensajesController.crearMensaje
)

router.get('/',

    auth,
    mensajesController.obtenerMensajes

)

module.exports = router;