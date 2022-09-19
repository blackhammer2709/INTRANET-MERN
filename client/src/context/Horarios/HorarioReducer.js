import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../types/index';

const HorarioReducer = (state, action) =>{

    switch(action.type){

        case OBTENER_CRUD:
            return{
                ...state,
                Clases: action.payload
            }
        
        case AGREGAR_CRUD:
            return{
                ...state,
                Clases:[...state.Clases,action.payload],
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
                Clases: state.Clases.filter(clase => clase.id !== action.payload),
                claseeditada:null
            }
        
        case REGISTRO_ACTUAL:
            console.log(action.payload)
            return{

                ...state,
                claseeditada:action.payload

            }
        
        case EDITAR_CRUD:
            return{
                ...state,
                Clases: state.Clases.map(clase => clase.id === action.payload.id ? action.payload : clase),
                claseeditada:null
            }

        default:
            return state;
    }

}

export default HorarioReducer;