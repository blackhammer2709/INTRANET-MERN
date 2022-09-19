import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AuthContext from "../../context/Auth/AuthContext";

import Sidebar from "../../componentes/Sidebar/Sidebar";
import IngresarEntradas from "../../componentes/Entradas/IngresarEntradas";
import ListadoEntradas from "../../componentes/Entradas/ListadoEntradas";


//import {Link} from 'react-router-dom';

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center" className={classes.colorLetra}>
      {"UNEFA © "}
      {"Sistema de informacion Administrativo "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    top : 0,
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(11),
    position: 'fixed', /** ese position tiene que ser absolute */
    maxHeight: '100vh',
    overflowY: 'auto',
    right: 0,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  colorLetra: {
    color: theme.palette.common.white,
  },
}));



const Main = () => {
  const modulos =["Carrera", "Secciones", "Salones", "Materias", "Profesores", "Calendario", "Admin"]
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const {usuarioAutenticado} = authContext;

  useEffect(()=>{

    usuarioAutenticado()

  },[])

  return (
    /*creo que el color de fondo puede cambiar*/
    <div className="contenedor-app">
      <Sidebar Modulos={modulos}/>
      <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className="seccion-principal">
                <main>
                  <IngresarEntradas />

                  <div className="contenedor-entradas">
                    <ListadoEntradas />
                  </div>
                </main>
        
              </div>
        
            </Paper>
        
          </Grid>
        
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default Main;
