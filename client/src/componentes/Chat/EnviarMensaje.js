import React, {useContext, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

import ChatContext from '../../context/Chat/ChatContext';

const useStyles = makeStyles((theme) => ({
  
  color: {
    backgroundColor: theme.palette.common.white,
      borderRadius: 8,
      boderBottom: 0,
  }
}));

const EnviarMensaje = () => {

  const chatContext = useContext(ChatContext);

  const {enviarMensajes}=chatContext;

  const [Mensajes, setMensaje]=useState({

      Usuario:"",
      Mensaje:"",
      Fecha:""
    
    });

    const {Mensaje} =Mensajes;

  const onChangeMensaje = (event)=>{

    event.preventDefault();
    setMensaje({
      ...Mensajes,[event.target.name]:event.target.value
    });

  }

  const enviar = (event) => {
    event.preventDefault();

    const tiempo=new Date();

    if(Mensaje.trim() === ""){

      alert("El mensaje no puede estar vacio");
      return;
      
    }

    Mensajes.Fecha=tiempo
    enviarMensajes(Mensajes)

    setMensaje({
      Mensaje:"",
    })

  }

  const classes = useStyles();
  return (
    <form>
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Escribe un mensaje..."
            fullWidth
            variant="filled"
            type="text"
            name="Mensaje"
            value={Mensaje}
            onChange={onChangeMensaje}
            className={classes.color}
          />
        </Grid>
        <Grid item xs={1} align="right">
        <Fab color="primary" aria-label="add" type="submit" onClick={enviar}>
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </form>
  );
};

export default EnviarMensaje;
