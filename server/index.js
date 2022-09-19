const express = require ('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear servidor

const server = express();

//conectar db

conectarDB();

//habilitar cors

server.use(cors());
//habilitar express.json

server.use(express.json({extended: true}));

//puerto del server
const PORT = process.env.PORT || 4000;

//importar rutas

server.use('/api/usuarios', require('./routes/usuarios'));
server.use('/api/auth', require('./routes/auth'));
server.use('/api/entradas', require('./routes/entradas'));
server.use('/api/mensajes', require('./routes/mensajes'));
server.use('/api/carreras', require('./routes/carreras'));
server.use('/api/materias', require('./routes/materias'));
server.use('/api/profesores', require('./routes/profesores'));
server.use('/api/salones', require('./routes/salones'));
server.use('/api/secciones', require('./routes/secciones'));
server.use('/api/clases', require('./routes/clases'));

//arrancar server

server.listen(PORT, () =>{
    console.log(`el servidor esta funcionando en el puerto ${PORT}`);
});