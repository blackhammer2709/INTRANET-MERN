import React, {useState} from 'react';
import {Button} from '@material-ui/core';

import Usuarios from './Usuarios';
import Permisos from './Permisos';

const Admin = () =>{

    const [Cambio, SetCambio] = useState(false);

    const Modulo = () =>{
        if(Cambio){
            SetCambio(false);
        }
        else{
            SetCambio(true);
        }
    }
    return(
        <>
            <h1>admin</h1>

            {Cambio ? <Button onClick={Modulo}>Usuario</Button>:<Button onClick={Modulo}>Permisos</Button>}

            {/* este Usuario y Permisos deberiamos agregarlos al sidebar como unos items adicionales solo cuando es admin
            podriamos pasarle al sidebar un arreglo como parametro que diga el nombre de las cosas y cuando entre aqui le agregamos usuario y permisos
            */}
            {Cambio ? <Permisos/>:<Usuarios/>}
        </>
    )
}

export default Admin;