import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL
} from '../../../types/index';

const CarreraReducer= (state, action) =>{

    switch(action.type){

        case OBTENER_CRUD:
            return{
                ...state,
                Carreras: action.payload
            }
        
        case AGREGAR_CRUD:
            return{
                ...state,
                Carreras:[...state.Carreras,action.payload],
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
                Carreras: state.Carreras.filter(carrera => carrera._id !== action.payload),
                carreraeditada:null
            }
        
        case REGISTRO_ACTUAL:
            return{

                ...state,
                carreraeditada:action.payload

            }
        
        case EDITAR_CRUD:
            return{
                ...state,
                Carreras: state.Carreras.map(carrera => carrera._id === action.payload._id ? action.payload : carrera),
                carreraeditada:null
            }

        default:
            return state;
    }
}


export default CarreraReducer;