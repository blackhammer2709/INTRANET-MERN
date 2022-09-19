import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';

const ProfesorReducer= (state, action) =>{

    switch(action.type){

        case OBTENER_CRUD:
            return{
                ...state,
                Profesores: action.payload
            }
        
        case AGREGAR_CRUD:
            return{
                ...state,
                Profesores:[...state.Profesores,action.payload],
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
                Profesores: state.Profesores.filter(profesor => profesor._id !== action.payload)
            }

        case REGISTRO_ACTUAL:
            return{

                ...state,
                profesoreditado:action.payload

            }
        
        case EDITAR_CRUD:
            return{
                ...state,
                Profesores: state.Profesores.map(profesor => profesor._id === action.payload._id ? action.payload : profesor),
                profesoreditado:null
            }


        default:
            return state;
    }
}


export default ProfesorReducer;