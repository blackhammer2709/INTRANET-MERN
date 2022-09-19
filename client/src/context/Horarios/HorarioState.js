import React, {useReducer} from 'react';
import HorarioContext from './HorarioContext';
import HorarioReducer from './HorarioReducer';

import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    //VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../types/index';

const HorarioState = props =>{
    
    const Stateinicial={
        Clases:[
            {
                id: "60df17b383a6a3379019c6b6",
                backgroundColor: "#000000",
                textColor: "#ffffff",
                start: "2021-07-05T09:00:00Z",
                title: "MAT-21213",
                end: "2021-07-05T09:45:00Z",
                Profesor: "Jepsenia Avila",
                Salon: "A1",
                Seccion: {
                    Semestre: 5,
                    Carrera: "INGENIERIA PETROQUIMICA",
                    Identificador:"B"
                }
            },
            {
                id: {
                    "$oid": "60df17d783a6a3379019c6b7"
                },
                backgroundColor: "#000000",
                textColor: "#ffffff",
                start:"2021-07-06T10:30:00Z",
                title: "MAT-II",
                end: "2021-07-06T11:15:00Z",
                Profesor: "Rafael Escalante",
                Salon: "A2",
                Seccion: {
                    Semestre: 1,
                    Carrera: "Ingenieria de Sistemas"
                }
            },
            {
                id: {
                    "$oid": "60df181983a6a3379019c6b9"
                },
                backgroundColor: "#000000",
                textColor: "#ffffff",
                start:"2021-07-07T16:00:00Z",
                title: "MAT-III",
                end:"2021-07-07T16:45:00Z",
                Profesor: "Williannis Deleón",
                Salon: "A3",
                Seccion: {
                    Semestre: 1,
                    Carrera: "Ingenieria de Sistemas"
                }
            },
            {
                id: {
                    "$oid": "60df24de52af0635c4df418f"
                },
                backgroundColor: "#000000",
                textColor: "#ffffff",
                start: "2021-07-01T16:15:00Z",
                title: "MAT-II",
                end:"2021-07-01T16:30:00Z",
                Profesor: "Rafael Escalante",
                Salon: "A2",
                Seccion: {
                    Semestre: 5,
                    Carrera: "Ingenieria PetroQuimica"
                }
            }
        ],
        claseeditada:null,
    }

    const[state, dispatch] = useReducer(HorarioReducer, Stateinicial);

    const obtenerClases =(Clases) =>{

        dispatch({
            type:OBTENER_CRUD,
            payload:Clases
        })

    }
    const agregarClase = Clase =>{

        Clase.id=1;
        dispatch({
            type:AGREGAR_CRUD,
            payload:Clase
        });
    }

    const eliminarClase = (id) =>{

        dispatch({
            type:ELIMINAR_CRUD,
            payload:id
        });
    }

    const seleccionarClase = Clase =>{
        console.log("state")
        console.log(Clase)
        dispatch({
            type:REGISTRO_ACTUAL,
            payload:Clase
        });
    }

    const editarClase = Clase=>{

        dispatch({
            type:EDITAR_CRUD,
            payload:Clase
        })
    }
    return(
        <HorarioContext.Provider value={{
                                        Clases:state.Clases,
                                        claseeditada:state.claseeditada,
                                        obtenerClases,
                                        agregarClase,
                                        eliminarClase,
                                        editarClase,
                                        seleccionarClase,
                                        }}>
            {props.children}
        </HorarioContext.Provider>
    );
}

export default HorarioState;