import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';

const SeccionReducer= (state, action) =>{

    switch(action.type){

        case OBTENER_CRUD:
            return{
                ...state,
                Secciones: action.payload
            }
        
        case AGREGAR_CRUD:
            return{
                ...state,
                Secciones:[...state.Secciones,action.payload],
                error:false
            }
        case VALIDAR_CRUD:
            
            return{
                ...state,
                error:true
            }

        case ELIMINAR_CRUD:
            
            return{
                ...state,
                Secciones: state.Secciones.filter(seccion => seccion._id !== action.payload),
                seccioneditada:null
            }
        
        case REGISTRO_ACTUAL:
            return{
                ...state,
                seccioneditada:action.payload
            }

        case EDITAR_CRUD:
            return{
                ...state,
                Secciones: state.Secciones.map(seccion => seccion._id === action.payload._id ? action.payload :seccion),
                seccioneditada:null
            }

        default:
            return state;
    }
}


export default SeccionReducer;