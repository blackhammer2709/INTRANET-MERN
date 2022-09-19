//rutas para crear usuarios

const express = require('express');

//rutas para autenticar
const router = express.Router();

const {check} = require('express-validator');
const auth = require('../middleware/auth')

const authController = require('../controlador/authController');
//iniciar
///api/auth

router.post('/',
    authController.autenticarUsuario
);
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports= router;