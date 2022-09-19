import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
export const MensajeRecibido = ({mensaje}) => {
    return (
        <div>
            <ListItem key="2">
            <ListItemIcon>
            <Avatar alt="Remy Sharp">
            <PersonIcon/>
            </Avatar>
            </ListItemIcon>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left">
                                <Typography>Usuario: {mensaje.Usuario.Nombre}</Typography>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left">
                                <Typography>{mensaje.Mensaje}</Typography>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left">
                                <Typography>Fecha: {Date(mensaje.Fecha).toString().substring(0,21)}</Typography>
                                </ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
        </div>
    );
}

export default MensajeRecibido;
