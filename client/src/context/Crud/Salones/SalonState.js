import React, { useReducer } from 'react';
import SalonContext from './SalonContext';
import SalonReducer from './SalonReducer';
import clienteAxios from '../../../config/axios';

import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    //VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';

const SalonState = props =>{

    const Stateinicial ={

        Salones: [],
        saloneditado:null

    }

    const [state, dispatch] = useReducer(SalonReducer, Stateinicial);

    const obtenerSalones = async () =>{

        try {
            const resultado = await clienteAxios.get('/api/salones');
            
            dispatch({
                
                type:OBTENER_CRUD,
                payload:resultado.data.salones

            })

        } catch (error) {
            console.log(error);
        }
    }

    const agregarSalon = async informacion =>{
        
        try {
            const resultado = await clienteAxios.post('/api/salones', informacion);
            dispatch({
                type:AGREGAR_CRUD,
                payload:resultado.data.salon
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarSalon = async (id) =>{

        try {
            
            await clienteAxios.delete(`/api/salones/${id}`);
            dispatch({
                type:ELIMINAR_CRUD,
                payload:id
            });

        } catch (error) {
            console.log(error)
        }
    }

    const seleccionarSalon = salon=>{

        dispatch({
            type:REGISTRO_ACTUAL,
            payload: salon
        })
    }

    const editarSalon = async salon =>{
        
        try {
            
            const resultado = await clienteAxios.put(`/api/salones/${salon._id}`,salon);
            dispatch({
                type:EDITAR_CRUD,
                payload:resultado.data.salon
            })
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <SalonContext.Provider value={{
                                    Salones:state.Salones,
                                    saloneditado:state.saloneditado,
                                    obtenerSalones,
                                    agregarSalon,
                                    eliminarSalon,
                                    seleccionarSalon,
                                    editarSalon
                                    }}>
                {props.children}
        </SalonContext.Provider>
    );

}

export default SalonState;