import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/Auth/AuthContext';

const RutaPrivada = ({component: Component, ...props}) => {
    
    const authContext = useContext(AuthContext);
    const {cargando, autenticado, usuarioAutenticado} = authContext

    useEffect(()=>{
        usuarioAutenticado()
    },[])
    return (
        <Route
        {...props}
        render={props => !autenticado && !cargando? (
            <Redirect to="/"/>
        ):(

            <Component {...props}/>

        )}
        />

    );
}
 
export default RutaPrivada;