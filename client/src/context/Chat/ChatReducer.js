import {
    OBTENER_MENSAJES,
    ENVIAR_MENSAJES
} from '../../types/index';

const ChatReducer= (state, action) =>{

    switch(action.type){

        case OBTENER_MENSAJES:
            return{
                ...state,
                Historial: action.payload
            }
        
        case ENVIAR_MENSAJES:
            return{
                ...state,
                Historial:[...state.Historial, action.payload],
            }

        default:
            return state;
    }
}


export default ChatReducer;