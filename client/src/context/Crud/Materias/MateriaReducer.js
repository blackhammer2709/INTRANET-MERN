import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';

const MateriaReducer= (state, action) =>{

    switch(action.type){

        case OBTENER_CRUD:
            return{
                ...state,
                Materias: action.payload
            }
        
        case AGREGAR_CRUD:
            return{
                ...state,
                Materias:[...state.Materias,action.payload],
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
                Materias: state.Materias.filter(materia => materia._id !== action.payload),
                materiaeditada:null
            }
        
        case REGISTRO_ACTUAL:
            return{

                ...state,
                materiaeditada:action.payload

            }
        
        case EDITAR_CRUD:
            return{
                ...state,
                Materias: state.Materias.map(materia => materia._id === action.payload._id ? action.payload : materia),
                materiaeditada:null
            }

        default:
            return state;
    }
}


export default MateriaReducer;