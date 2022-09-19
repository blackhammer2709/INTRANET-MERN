import React, { useReducer } from 'react';
import ProfesorContext from './ProfesorContext';
import ProfesorReducer from './ProfesorReducer';
import clienteAxios from '../../../config/axios';

import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    //VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';


const ProfesorState = props =>{

    const Stateinicial ={

        Profesores: [],
        profesoreditado:null

    }

    const [state, dispatch] = useReducer(ProfesorReducer, Stateinicial);

    const obtenerProfesores = async () =>{

        try {
            const resultado = await clienteAxios.get('/api/profesores');
            dispatch({
            
                type:OBTENER_CRUD,
                payload:resultado.data.profesores
            
            })

        } catch (error) {
            console.log(error);
        }
    }

    const agregarProfesor = async informacion =>{
        
        try {
            
            const resultado = await clienteAxios.post('/api/profesores', informacion);
            dispatch({
            
                type:AGREGAR_CRUD,
                payload:resultado.data.profesor
            
            });

        } catch (error) {
            console.log(error);
        }
    }

    const eliminarProfesor = async (id) =>{

        try {
            
            await clienteAxios.delete(`/api/profesores/${id}`);
            dispatch({
            
                type:ELIMINAR_CRUD,
                payload:id
            
            });

        } catch (error) {
            console.log(error)
        }
    }

    const seleccionarProfesor = profesor=>{

        dispatch({
            type:REGISTRO_ACTUAL,
            payload: profesor
        })
    }

    const editarProfesor = async profesor =>{
        
        try {
            
            const resultado = await clienteAxios.put(`/api/profesores/${profesor._id}`, profesor);
            
            dispatch({
                type:EDITAR_CRUD,
                payload:resultado.data.profesor
            })
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <ProfesorContext.Provider value={{
                                    Profesores:state.Profesores,
                                    profesoreditado:state.profesoreditado,
                                    obtenerProfesores,
                                    agregarProfesor,
                                    eliminarProfesor,
                                    seleccionarProfesor,
                                    editarProfesor
                                    }}>
                {props.children}
        </ProfesorContext.Provider>
    );

}

export default ProfesorState;