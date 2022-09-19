import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
  });

const UsuarioChat = ({usuario}) => {
    const classes = useStyles();
    return ( 
        <li key={usuario.cedula}>
            {/*si ponemos los modulos podemos usar esto mismo cambiando button por link */}
            
            <Grid item xs={10} className={classes.borderRight500}>
            <List>
            <ListItem button key="RemySharp">
            <ListItemIcon>
            <Avatar alt="Remy Sharp">
            <PersonIcon/>
            </Avatar>
            </ListItemIcon>
            <ListItemText key={usuario.Cedula}>{usuario.Nombre}</ListItemText>
            </ListItem>
                </List>
            <Divider/>
            </Grid>
        
        </li>
    );
}

export default UsuarioChat;