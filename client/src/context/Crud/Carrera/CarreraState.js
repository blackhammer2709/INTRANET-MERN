import React, { useReducer } from 'react';
import CarreraContext from './CarreraContext';
import CarreraReducer from './CarreraReducer';
import clienteAxios from '../../../config/axios';
import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    //VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';


const CarreraState = props =>{

    const Stateinicial ={

        Carreras: [],
        carreraeditada:null,

    }

    const [state, dispatch] = useReducer(CarreraReducer, Stateinicial);

    const obtenerCarrera = async () =>{

        try {
            const resultado = await clienteAxios.get('/api/carreras')
            dispatch({
                type:OBTENER_CRUD,
                payload:resultado.data.carreras
            })
            
        } catch (error) {
            console.log(error);
        }

    }

    const agregarCarrera = async informacion =>{
        try {

            const resultado = await clienteAxios.post('/api/carreras', informacion)
            dispatch({
                type:AGREGAR_CRUD,
                payload:resultado.data.carrera
            });
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarCarrera = async (id) =>{

        try {
            await clienteAxios.delete(`/api/carreras/${id}`)
            dispatch({
                type:ELIMINAR_CRUD,
                payload:id
            });
        } catch (error) {
            console.log(error);
        }
    }

    const seleccionarCarrera = carrera=>{

        dispatch({
            type:REGISTRO_ACTUAL,
            payload: carrera
        })
    }

    const editarCarrera = async carrera =>{
        
        try {
            const resultado = await clienteAxios.put(`/api/carreras/${carrera._id}`,carrera);
            dispatch({
                type:EDITAR_CRUD,
                payload: resultado.data.carrera
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <CarreraContext.Provider value={{
                                    Carreras:state.Carreras,
                                    carreraeditada:state.carreraeditada,
                                    obtenerCarrera,
                                    agregarCarrera,
                                    eliminarCarrera,
                                    editarCarrera,
                                    seleccionarCarrera,
                                    }}>
                {props.children}
        </CarreraContext.Provider>
    );

}

export default CarreraState;