import React, { useReducer } from 'react';
import SeccionContext from './SeccionContext';
import SeccionReducer from './SeccionReducer';
import clienteAxios from '../../../config/axios';

import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    //VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';


const SeccionState = props =>{

    const Stateinicial ={

        Secciones: [],
        seccioneditada:null,

    }

    const [state, dispatch] = useReducer(SeccionReducer, Stateinicial);

    const obtenerSecciones = async () =>{

        try {
            
            const resultado = await clienteAxios.get('/api/secciones');
            dispatch({
                type:OBTENER_CRUD,
                payload:resultado.data.secciones
            })
        } catch (error) {
            console.log(error)
        }
    }

    const agregarSeccion = async informacion =>{
        
        try {
            const resultado = await clienteAxios.post('/api/secciones', informacion)
            dispatch({
                type:AGREGAR_CRUD,
                payload:resultado.data.seccion
            });

        } catch (error) {
            console.log(error);
        }

    }

    const eliminarSeccion = async (id) =>{

        try {
            await clienteAxios.delete(`/api/secciones/${id}`)
            dispatch({
                type:ELIMINAR_CRUD,
                payload:id
            });

        } catch (error) {
            console.log(error);
        }
    }

    const seleccionarSeccion = seccion=>{

        dispatch({
            type:REGISTRO_ACTUAL,
            payload:seccion
        });
    }

    const editarSeccion = async seccion=>{

        try {
            const resultado = await clienteAxios.put(`/api/secciones/${seccion._id}`,seccion);
            dispatch({
                type:EDITAR_CRUD,
                payload:resultado.data.seccion
            });
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <SeccionContext.Provider value={{
                                    Secciones:state.Secciones,
                                    seccioneditada:state.seccioneditada,
                                    obtenerSecciones,
                                    agregarSeccion,
                                    eliminarSeccion,
                                    editarSeccion,
                                    seleccionarSeccion,
                                    }}>
                {props.children}
        </SeccionContext.Provider>
    );

}

export default SeccionState;