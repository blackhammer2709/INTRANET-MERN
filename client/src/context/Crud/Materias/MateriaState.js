import React, { useReducer } from 'react';
import MateriaContext from './MateriaContext';
import MateriaReducer from './MateriaReducer';
import clienteAxios from '../../../config/axios';

import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    //VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';

const MateriaState = props =>{

    const Stateinicial ={

        Materias: [],
        materiaeditada:null

    }

    const [state, dispatch] = useReducer(MateriaReducer, Stateinicial);

    const obtenerMaterias = async () =>{

        try {
            const resultado = await clienteAxios.get('/api/materias')
            dispatch({
                type:OBTENER_CRUD,
                payload:resultado.data.materias
            })
        } catch (error) {
            console.log(error)
        }
    }

    const agregarMateria = async informacion =>{
        
        try {

            const resultado = await clienteAxios.post('/api/materias', informacion)
            dispatch({
                type:AGREGAR_CRUD,
                payload:resultado.data.materia
            });
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarMateria = async (id) =>{

        try {
            await clienteAxios.delete(`/api/materias/${id}`)
            dispatch({
                type:ELIMINAR_CRUD,
                payload:id
            });
        } catch (error) {
            console.log(error)
        }
    }

    const seleccionarMateria = materia=>{

        dispatch({
            type:REGISTRO_ACTUAL,
            payload: materia
        })
    }

    const editarMateria = async materia =>{
        
        try {
            const resultado = await clienteAxios.put(`/api/materias/${materia._id}`,materia)
            dispatch({
                type:EDITAR_CRUD,
                payload:resultado.data.materia
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    return(
        <MateriaContext.Provider value={{
                                    Materias:state.Materias,
                                    materiaeditada:state.materiaeditada,
                                    obtenerMaterias,
                                    agregarMateria,
                                    eliminarMateria,
                                    editarMateria,
                                    seleccionarMateria,
                                    }}>
                {props.children}
        </MateriaContext.Provider>
    );

}

export default MateriaState;