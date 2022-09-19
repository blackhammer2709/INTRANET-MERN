import React, { useReducer } from 'react';
import EntradasContext from './EntradasContext';
import EntradasReducer from './EntradasReducer';


import clienteAxios from '../../config/axios';

import {
        OBTENER_PUBLICACION,
        AGREGAR_PUBLICACION,
        VALIDAR_PUBLICACION,
        ELIMINAR_PUBLICACION
        } from '../../types';

//state son valores que se pueden almacenar en cualquier momento
//cache, rutas, acciones, informacion que no se ha mandado al servidor, ej: al recolectar la info en un formulario eso puede ser un state

const EntradasState = props =>{
    
    const Stateinicial = {

        publicaciones:[],
        error:false

    }

    //dispatch

    const [state, dispatch] = useReducer(EntradasReducer, Stateinicial)

    //OBTENER PUBLICACIONES

    const obtenerPublicacion = async () =>{
        try {

            const resultado = await clienteAxios.get('/api/entradas');

            dispatch({
                type:OBTENER_PUBLICACION,
                payload:resultado.data.entradas.reverse()
            })
        } catch (error) {
            console.log(error)
        }
    }

    //agregar publicacion

    const agregarPublicacion = async entradas =>{
        
        try {
            
            const resultado = await clienteAxios.post('/api/entradas', entradas);
            dispatch({
                type: AGREGAR_PUBLICACION,
                payload:resultado.data
            });
        } catch (error) {
            console.log(error)
        }
    }

    //mostrar mensaje de error
    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_PUBLICACION
        });
    }

    //eliminar publicaciones por su id

    const eliminarPublicacion = async (id) =>{
        
        try {
            await clienteAxios.delete(`/api/entradas/${id}`);
            dispatch({
                type:ELIMINAR_PUBLICACION,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }

    }


    return(
        <EntradasContext.Provider value={{
                                            publicaciones:state.publicaciones,
                                            error: state.error,
                                            obtenerPublicacion,
                                            agregarPublicacion,
                                            mostrarError,
                                            eliminarPublicacion
                                        }}>
            {props.children}
        </EntradasContext.Provider>
    );
}

export default EntradasState;