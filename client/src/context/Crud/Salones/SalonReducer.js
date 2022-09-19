import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';

const SalonReducer= (state, action) =>{

    switch(action.type){

        case OBTENER_CRUD:
            return{
                ...state,
                Salones: action.payload
            }
        
        case AGREGAR_CRUD:
            return{
                ...state,
                Salones:[...state.Salones,action.payload],
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
                Salones: state.Salones.filter(salon => salon._id !== action.payload)
            }

        case REGISTRO_ACTUAL:
            return{

                ...state,
                saloneditado:action.payload

            }
        
        case EDITAR_CRUD:
            return{
                ...state,
                Salones: state.Salones.map(salon => salon._id === action.payload._id ? action.payload : salon),
                saloneditado:null
            }

        default:
            return state;
    }
}


export default SalonReducer;