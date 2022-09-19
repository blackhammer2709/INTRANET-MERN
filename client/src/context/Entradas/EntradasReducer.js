
//reducer ayuda con la gestion del state
import {
        OBTENER_PUBLICACION,
        AGREGAR_PUBLICACION,
        VALIDAR_PUBLICACION,
        ELIMINAR_PUBLICACION
} from '../../types';
const EntradasReducer= (state, action) =>{

    switch(action.type){

        case OBTENER_PUBLICACION:
            console.log(action.payload)
            return{
                ...state,
                publicaciones: action.payload
            }
        
        case AGREGAR_PUBLICACION:
            return{
                ...state,
                publicaciones:[action.payload, ...state.publicaciones],
                error:false
            }
        case VALIDAR_PUBLICACION:
            
            return{
                ...state,
                error:true
            }

        case ELIMINAR_PUBLICACION:
            
            return{
                ...state,
                publicaciones: state.publicaciones.filter(publicacion => publicacion._id !== action.payload)
            }

        default:
            return state;
    }
}


export default EntradasReducer;