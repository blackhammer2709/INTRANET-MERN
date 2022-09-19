import React, { useReducer } from 'react';
import ChatContext from './ChatContext';
import ChatReducer from './ChatReducer';

import {
    OBTENER_MENSAJES,
    ENVIAR_MENSAJES
} from '../../types/index';
import clienteAxios from '../../config/axios';

const ChatState = props => {
    
    const Stateinicial = {

        Historial: []
    
    }

    const [state, dispatch] = useReducer(ChatReducer, Stateinicial);

    const obtenerMensajes = async () =>{

        try {

            const resultado = await clienteAxios.get('/api/mensajes')
            dispatch({
                type: OBTENER_MENSAJES,
                payload:resultado.data.mensajes
            });
        } catch (error) {
            console.log(error)
        }

    }

    const enviarMensajes = async (Mensaje) => {
        
        try {

            const resultado = await clienteAxios.post('/api/mensajes', Mensaje)
            console.log(resultado)
            dispatch({

                type:ENVIAR_MENSAJES,
                payload:resultado.data
            
            })
        } catch (error) {
            console.log(error);
        }
    
    }

    return (
        <ChatContext.Provider value={{
                                    
            Historial: state.Historial,
            obtenerMensajes,
            enviarMensajes,
                                    
        }}>
            {props.children}

        </ChatContext.Provider>
    );

}

export default ChatState;