import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
export const MensajeEnviado = ({mensaje}) => {

    return (
        <div>
            <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right">
                                <Typography>Usuario: {mensaje.Usuario.Nombre}</Typography>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right">
                                <Typography>{mensaje.Mensaje}</Typography>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right">
                                <Typography>Fecha: {Date(mensaje.Fecha).toString().substring(0,21)}</Typography>
                                </ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
        </div>
    );
}

export default MensajeEnviado;
