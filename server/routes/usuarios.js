//rutas para crear usuarios

const express = require('express');

const router = express.Router();

const usuarioController = require('../controlador/usuarioController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');
//crear usuario
///api/usuarios

router.post('/',

    //auth,
    [
        check('Nombre', 'el Nombre es obligatorio').not().isEmpty(),
        check('Cedula', 'la cedula es obligatoria').not().isEmpty(),
        check('Cedula', "la cedula debe tener un minimo de 7 caracteres").isLength({min:7}),
        check('Clave', 'La Clave es Obligatoria').not().isEmpty(),
    ],
    usuarioController.crearUsuario
);

router.get('/',

    auth,
    usuarioController.obtenerUsuarios

)

router.put('/:id',

    auth,
    [
        check('Nombre', 'el Nombre es obligatorio').not().isEmpty(),
        check('Cedula', 'la cedula es obligatoria').not().isEmpty(),
        check('Cedula', "la cedula debe tener un minimo de 7 caracteres").isLength({min:7}),
        check('Clave', 'La Clave es Obligatoria').not().isEmpty(),
    ],
    usuarioController.actualizarUsuario
)

router.delete('/:id',

    auth,
    usuarioController.eliminarUsuario
)
module.exports= router;