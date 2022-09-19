import React, {Fragment} from 'react';

import {Button} from '@material-ui/core'
import Tabla from '../../componentes/Tabla/Tabla';

const Permisos = () =>{

    const Permisos =[
        {
            Nombre:"Carrera"
        },
        {
            Nombre:"Horarios"
        },
        {
            Nombre:"Materias"
        },
        {
            Nombre:"Profesores"
        },
        {
            Nombre:"Salones"
        },
        {
            Nombre:"Secciones"
        },
    ]
    return(
        <>
        <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={()=>(alert("Abierto"))}
            >NUEVO REGISTRO</Button>

            <h1>Permisos</h1>
            {Permisos.length === 0 ?
                (<li className="entrada"><p>Sin Carreras</p></li>)
                :<Tabla datos={Permisos} buscar="Nombre" titulo="Filtrar por Cedula de Usuario" Eliminar={()=>alert("eliminado")} Editar={()=>alert("editado")}/>
            }
        </>
    )
}

export default Permisos;