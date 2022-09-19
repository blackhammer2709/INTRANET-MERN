import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Container from "@material-ui/core/Container";
import List from '@material-ui/core/List';
import EnviarMensaje from './EnviarMensaje';
import MensajeEnviado from './MensajeEnviado';
import MensajeRecibido from './MensajeRecibido';

import ChatContext from '../../context/Chat/ChatContext';
import AuthContext from '../../context/Auth/AuthContext';

const useStyles = makeStyles({
  
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
    color: 'white',
  }
});

const CajaDeMensajes = () => {
  const authContext = useContext(AuthContext)
  const chatContext = useContext(ChatContext);

  const {Historial, obtenerMensajes} =chatContext;
  const { usuario }=authContext

  useEffect(()=>{
    obtenerMensajes();
  },[])

  const classes = useStyles();

  return (
      <div>
        
            <Container  maxWidth="lg">
                <List className={classes.messageArea}>
                    {
                        Historial.map((mensaje, i) => (
                          mensaje.Usuario.Nombre === usuario.Nombre
                                ? <MensajeEnviado key={i} mensaje={mensaje}/>
                                : <MensajeRecibido key={i} mensaje={mensaje}/>
                        ))
                    }

                </List>
                <Divider />
                <EnviarMensaje/>
            </Container>
      </div>
  );
}

export default CajaDeMensajes;