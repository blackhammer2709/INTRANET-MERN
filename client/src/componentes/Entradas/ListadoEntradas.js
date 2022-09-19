import React, { useContext, useEffect } from 'react';
import Entrada from './Entradas';
import EntradasContext from '../../context/Entradas/EntradasContext';
import { Button } from '@material-ui/core';

const ListadoEntradas = () => {

    const entradaContext = useContext(EntradasContext);
    const { publicaciones, obtenerPublicacion } = entradaContext;

    
    //obtenerPublicacion viene de /context/entradas/EntradasState
    //archivos relacionados
    /* 
        /componentes/entradas
        /context/entradas
        /types
    */
    useEffect(() => {
            obtenerPublicacion()
            //obtenerPublicacion(publicaciones); //AQUI ESTOY CONFUNDIDO sin esta funcion trabaja normal como quiero... pero si quito el comentario sigue funcionando y me pide una dependencia para obtenerpublicacion()
            //es mas puedo quitar el useEffect y sigue funcionando... porfa si puedes habla con joffre de esto ahora tengo dudas porque busco y en realidad no entiendo que cambio hay
            //entonces ahora si habilito obtenerPublicacion me da un error de que no se puede leer undefined mas abajo en el if y busque y pasa cuando se combinan ciertos hooks
            //juan pablo dice que lo acomodara mas adelante
            //react-transition-group
    },[])    
    
    return (

        <div>
        
            <ul className="listado-entradas">

                {
                    publicaciones.length === 0 ?

                    (<li className="entrada"><p>Sin Publicaciones</p></li>)

                    : publicaciones.map((entrada,index) => (
                            <Entrada key={index} entrada={entrada}/>
                    ))
                
                }

            </ul>
        
        </div>
    );
}

export default ListadoEntradas;