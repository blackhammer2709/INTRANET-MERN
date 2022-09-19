import React, { useContext } from 'react';
import UsuarioChat from './UsuarioChat'
import AuthContext from '../../context/Auth/AuthContext';
const ListadoUsuarios = () => {
    const authContext = useContext(AuthContext);
    const {Usuarios} = authContext;
    
    return ( 

        <div className="listado-usuarios">

            {Usuarios.map((usuario, index) =>(

                <UsuarioChat key={index} usuario={usuario}/>

            ))}
        </div>
    );
}

export default ListadoUsuarios;