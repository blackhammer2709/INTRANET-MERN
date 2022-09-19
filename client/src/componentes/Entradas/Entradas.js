import React, { useContext } from 'react';
import EntradasContext from '../../context/Entradas/EntradasContext';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AuthContext from '../../context/Auth/AuthContext';

const Entrada = ({entrada}) => {

    const entradasContext = useContext(EntradasContext);
    const {eliminarPublicacion} = entradasContext;

    const authContext = useContext(AuthContext)
    const { usuario }=authContext

    //funcion para eliminar publicaciones
    
    const eliminarEntrada = (id) =>{

        eliminarPublicacion(id);

    }

    const useStyles = makeStyles((theme) => ({
        texto: {
            textOverflow: "wrap",
            textAlign:"justify"
        },
        paper: {
            padding: theme.spacing(2),
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
            webkitBoxShadow: "0px 6px 11px -8px rgba(0, 0, 0, 0.9)",
            mozBoxShadow: "0px 4px 10px -3px rgba(0, 0, 0, 0.9)",
            boxShadow: "0px 4px 10px -3px rgba(0, 0, 0, 0.9)",
        },
    }));
    
      // se llama classes para igualarlo al arrow funtion
    const classes = useStyles();
    return ( 
        <Grid container item xs={12} className={classes.paper}>
            <Grid direction="row">
                <Grid item xs={12}>
            
            <Grid className="fecha">
                <Button onClick={()=>{console.log(entrada.fecha)}}>PRUEBAA</Button>
                
                <Typography className="completo">
                    {Date(entrada.fecha).substring(0,21)}
                </Typography>
                <Typography>Por el Usuario: {entrada.Usuario.Nombre}</Typography>
                
                {/*estos botones los podemos reciclar para los cruds aparte podemos ver como hacer para que un usuario borre o edite solo sus publicaciones */}
                

            </Grid>
            </Grid>
            </Grid>
            <Grid direction="row">
                <Grid item xs={12}>
                <Typography className={classes.texto}>{entrada.Mensaje}</Typography>
                </Grid>
                </Grid>
                {entrada.Usuario.Nombre === usuario.Nombre ?
                <Box mt={1}>
                <div className="acciones">
                    
                    <Button color="secondary" variant="contained" size="small" onClick={()=>eliminarEntrada(entrada._id)}>Eliminar &times;</Button>
                </div>
                </Box>:null}
        </Grid>
    );
}

export default Entrada;