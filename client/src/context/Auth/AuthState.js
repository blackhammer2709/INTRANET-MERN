import React, {useReducer} from 'react';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    //VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL,
    OBTENER_USUARIO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
} from '../../types/index';

    const AuthState = props =>{

        const Stateinicial ={
            Usuarios: [
                {
                    _id:1,
                    Nombre:"Rafael Escalante",
                    Cedula:"27247395",
                    Clave:"12345",
                    Admin:false
                },
                {
                    _id:2,
                    Nombre:"Adriana Garcia",
                    Cedula:"10476255",
                    Clave:"064",
                    Admin:false
                }
        
            ],
            token: localStorage.getItem('token'),
            autenticado: null,
            usuario: null,
            usuarioeditado:null,
            cargando:true
        }

        const [state, dispatch] = useReducer(AuthReducer, Stateinicial);

        const obtenerUsuario = (Cruds) =>{

            dispatch({
                type:OBTENER_CRUD,
                payload:Cruds
            })
        }
    
        const eliminarUsuario = (id) =>{
    
            dispatch({
                type:ELIMINAR_CRUD,
                payload:id
            });
        }
    
        const seleccionarUsuario = usuario=>{
    
            dispatch({
                type:REGISTRO_ACTUAL,
                payload: usuario
            })
        }
    
        const editarUsuario = usuario =>{
            
            dispatch({
                type:EDITAR_CRUD,
                payload:usuario
            })
        }

        const agregarUsuario = async informacion =>{
            try {
                informacion.id=4
                const respuesta = await clienteAxios.post('api/usuarios',informacion);
                console.log(respuesta)
                dispatch({
                    type:AGREGAR_CRUD,
                    payload:informacion
                });
                
            } catch (error) {

                alert(error.response.data.msg);
            }

        }

        const usuarioAutenticado = async () =>{
            const token = localStorage.getItem('token');
            if(token){
                //token por header
                tokenAuth(token);
            }
                try{
                    const respuesta = await clienteAxios.get('/api/auth')
                    
                    dispatch({
                        type:OBTENER_USUARIO,
                        payload:respuesta.data.usuario
                    })

                }
                catch(error){
                    console.log(error)
                    dispatch({
                        type:LOGIN_ERROR
                    })
                }
            
        }

        //iniciar sesion

        const iniciarSesion = async datos =>{

            try {
                const respuesta = await clienteAxios.post('/api/auth', datos);
                
                dispatch({
                    type:LOGIN_EXITOSO,
                    payload:respuesta.data
                })


                usuarioAutenticado()
            } catch (error) {
                alert(error.response.data.msg);
                dispatch({
                    type:LOGIN_ERROR,
                })
            }
        }

        //cerra sesion

        const cerrarSesion = ()=>{
            dispatch({
                type:CERRAR_SESION
            })
        }
        
        
        
        return(

            <AuthContext.Provider
                value={{
                    Usuarios:state.Usuarios,
                    token:state.token,
                    autenticado:state.autenticado,
                    usuario:state.usuario,
                    usuarioeditado:state.usuarioeditado,
                    cargando:state.cargando,
                    obtenerUsuario,
                    editarUsuario,
                    eliminarUsuario,
                    seleccionarUsuario,
                    agregarUsuario,
                    iniciarSesion,
                    usuarioAutenticado,
                    cerrarSesion
                }}>

                {props.children}

            </AuthContext.Provider>
        )
    }

    export default AuthState