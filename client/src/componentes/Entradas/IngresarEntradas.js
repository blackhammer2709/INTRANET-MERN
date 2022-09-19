import React, {useContext, useState} from 'react';
import EntradasContext from '../../context/Entradas/EntradasContext';




const IngresarEntrada = () => {

    const entradasContext = useContext(EntradasContext);
        //EntradaNueva,
    const { error, mostrarError, agregarPublicacion} = entradasContext;

    const [entradas, guardarEntrada] = useState({
        Usuario:"" ,
        Mensaje:"", 
    
    });

    const {Mensaje} = entradas;
    
    //hay que ver como sacar el nombre del usuario cuando se loguea
    //event.preventDefault es para que cuando ocurra event (en caso de probar() es cuando le das al boton y en caso de onchangeentrada cuando escribas) no se recargue la pagina

    const onChangeEntrada = event =>{
        event.preventDefault();
        
        guardarEntrada({
            ...entradas, [event.target.name]: event.target.value
        })
        
    }

    //funcion para guardar publicaciones en state y posterior bd
    const onSubmit = event =>{
        event.preventDefault();

        if (Mensaje.trim() === ''){
            
            mostrarError();
            return;
            

        }
        
        agregarPublicacion(entradas);

        guardarEntrada({
            Mensaje:''
        })

    }
    
//pattern="[A-Za-z0-9]+"
//title="El mensaje no debe contener caracteres extraños"
//hay una vaina extra estas son props de input quiero que me evalue solo me acepte letras y numeros pero ese pattern me excluye espacios debo ver como incluir

    return (
        <div className="formulario">
            <form onSubmit={onSubmit} autoComplete="off">
                <div className="contenedor-input">
                
                    <input 
                        type="text" 
                        className="input-text"
                        placeholder="Publicacion..."
                        name="Mensaje"
                        value={Mensaje}
                        pattern="[A-Za-z0-9¡!¿? ,;.:´]+"
                        title="El mensaje no debe contener caracteres extraños (# $ - _ / \ ¨{}[] % ())"
                        onChange={onChangeEntrada}
                        ></input>
                
                </div>

                <div className="contenedor-input">
                
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-block btn-submit"
                        value="Publicar"

                        ></input>
                
                </div>

            </form>

            {error ? <p className="mensaje error">El mensaje no debe estar vacios </p>:null}

        </div>
    );
}

export default IngresarEntrada;