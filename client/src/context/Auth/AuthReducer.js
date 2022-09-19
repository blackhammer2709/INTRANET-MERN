import {
    OBTENER_CRUD,
    AGREGAR_CRUD,
    VALIDAR_CRUD,
    EDITAR_CRUD,
    ELIMINAR_CRUD,
    REGISTRO_ACTUAL,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    CERRAR_SESION
} from '../../types/index';

const AuthReducer= (state, action) =>{

    switch(action.type){

        case OBTENER_CRUD:
            return{
                ...state,
                Usuarios: action.payload
            }
        
        case AGREGAR_CRUD:
            return{
                ...state,
                Usuarios:[...state.Usuarios,action.payload],
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
                Usuarios: state.Usuarios.filter(usuario => usuario.id !== action.payload),
                usuarioeditado:null
            }
        
        case REGISTRO_ACTUAL:
            return{

                ...state,
                usuarioeditado:action.payload

            }
        
        case EDITAR_CRUD:
            return{
                ...state,
                Usuarios: state.Usuarios.map(usuario => usuario.id === action.payload.id ? action.payload : usuario),
                usuarioeditado:null
            }

        case OBTENER_USUARIO:
            
            return{
                ...state,
                autenticado:true,
                usuario:action.payload,
                cargando:false
            }

        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                autenticado:true,
                cargando:false
            }

        case LOGIN_ERROR:
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                usuario:null,
                autenticado:null,
                cargando:false
            }
        default:
            return state;
    }
}

export default AuthReducer