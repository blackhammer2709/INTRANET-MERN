import React, { useContext, useEffect, useState } from "react";
import logo from "./logo2.jpg";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/Auth/AuthContext";


//todos import que estan arriba son de material ui para usar los estilos
//video 194 funcion para admin crear nuevo usuario
const Login = (props) => {

  const authContext = useContext(AuthContext);
  const {autenticado, iniciarSesion} =authContext;
  //state persona para iniciar sesion en bd
  //state es como un objeto, el guarda informacion relevante para tu sistema (Usuario) y tiene un metodo para modificar su valor (guardarUsuario)
  
  useEffect(()=>{
    if(autenticado){
      props.history.push('/main')
    }
  },[autenticado, props.history])

  const [Usuario, guardarUsuario] = useState({
    Cedula: "",
    Clave: "",
  });

  //constante para extraer datos del state
  const { Cedula, Clave } = Usuario;

  //funcion para recolectar datos de input y guardar en persona

  const recogerdatos = (event) => {
    guardarUsuario({
      ...Usuario,

      [event.target.id]: event.target.value,
    });
  };

  //funcion para cuando el usuario ingresa datos y valida
  const onSubmit = (event) => {
    event.preventDefault();
    
    if(Cedula.trim() === "" || Clave.trim() === ""){

      alert("Los Campos no deben estar vacios");
      return;    
    
    }
  
    else{
    iniciarSesion({Cedula, Clave})

      //console.log(autenticado)
      //let a = document.createElement("a")
      //a.href="/main"
      //a.click()

      //action
    }
  };

  //mostrar clave
  const mostrarclave = () => {
    var visible = document.getElementById("Clave");

    if (visible.type === "password") {
      visible.type = "text";
    } else {
      visible.type = "password";
    }
  };

  //la funcion que esta abajo es para el footer
  //la tipography es un componenete de texto en material ui puedes verlo en la documentacion

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center" className={classes.colorLetra}>
        {"UNEFA © "}

        {new Date().getFullYear()}
        {"."}

        {" Sistema de informacion Administrativo, "}

        {"Desarrolladores: "}

        {"Brll. Escalante, Rafael."}
        {"Brll. Rivero, Johanry."}

        {" Tutora:"}

        {" Ing. Jepsenia Avila "}
      </Typography>
    );
  }

  //el arrow funtion que esta abajo es el css de material ui, se le da estilo a cada componenete
  // y se llama luego en su respectivo componenete, cada propiedad lo puedes ver en material ui con su respectivo componenete

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      '& label.Mui-focused': {
        color: 'black',
      },
    },
    image: {
      backgroundImage: `url(${logo})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "covercontain",
      backgroundPosition: "center",
    },
    colorFormulario: {
      backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    },
    input: {
      backgroundColor: theme.palette.common.white,
      borderRadius: 8,
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      fontSize: 12,
    },
    colorLetra: {
      color: theme.palette.common.white,
    },
    colorCheck: {
      color: theme.palette.common.white,
    },
  }));

  // se llama classes para igualarlo al arrow funtion
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.colorFormulario}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component={"h1"} variant={"h5"} className={classes.colorLetra}>
            Bienvenido al Sistema de Informacion Administrativo
          </Typography>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <TextField
              className={classes.input}
              variant="filled"
              margin="normal"
              required
              fullWidth
              type="text"
              id="Cedula"
              placeholder="Ingresar Cedula"
              label="Cedula"
              value={Cedula}
              onChange={recogerdatos}
              autoFocus
            />
            <TextField
              className={classes.input}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="Clave"
              type="password"
              placeholder="Ingresar Contraseña..."
              value={Clave}
              onChange={recogerdatos}
              label="Contraseña"
            />
            <FormControlLabel
              control={
                <Checkbox id="mostrar" color="default" className={classes.colorCheck} onClick={mostrarclave} />
              }
              label="Mostrar contraseña" className={classes.colorLetra}
            />            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
            >
              Iniciar sesion
            </Button>
            <Box mt={1}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={classes.submit}
                onClick={() => alert("Mensaje de recuperacion enviado, Comuniquese con el Administrador")}
              >
                ¿Olvido su contraseña?
              </Button>
            </Box>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;