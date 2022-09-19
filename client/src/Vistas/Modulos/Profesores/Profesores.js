import React, {Fragment, useContext, useState, useEffect}from "react";
import { Button, MenuItem, Select  } from '@material-ui/core';
import Modal from '../../../componentes/Modal/Modal';

import Tabla from '../../../componentes/Tabla/Tabla';

import ProfesorContext from '../../../context/Crud/Profesores/ProfesorContext';

import Sidebar from "../../../componentes/Sidebar/Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const Profesores = () => {

    const profesorContext = useContext(ProfesorContext);

    const {Profesores, profesoreditado, obtenerProfesores, agregarProfesor, eliminarProfesor, seleccionarProfesor, editarProfesor} = profesorContext;

    useEffect(()=>{

        obtenerProfesores();

    },[])

    useEffect(()=>{

        if (profesoreditado !== null) {

            SetProfesor(profesoreditado);
            Abierto();
            
        }
        else{

            SetProfesor({

            _id:0,
            Nombre:"",
            Apellido:"",
            Tipo_Documento:"",
            Nro_Documento:"",
            Tipo:"",
            Telefono:"",
            Profesion:"",
            Email:"",

        })

        }
    },[profesoreditado]);
    const [Profesor, SetProfesor] = useState({

        _id:0,
        Nombre:"",
        Apellido:"",
        Tipo_Documento:"",
        Nro_Documento:"",
        Tipo:"",
        Telefono:"",
        Profesion:"",
        Email:"",

    });

    const {_id,Nombre,Apellido,Tipo_Documento,Nro_Documento,Tipo,Telefono,Profesion,Email}=Profesor;
    
    const  Almacenar = (event) =>{
        
        event.preventDefault();

        SetProfesor({

            ...Profesor, [event.target.name]: event.target.value,
            
        })
        
    }

    const onSubmit = event =>{
        event.preventDefault();

        if(Nombre.trim() === "" || Apellido.trim() === "" || Tipo_Documento.trim() === "" || Nro_Documento.trim() === "" || Tipo.trim() === ""|| Telefono.trim() === ""|| Profesion.trim() === ""|| Email.trim() === ""){
            
            alert("Debes ingresar los datos");
            return;

        }

        let error ="";
        Profesores.forEach(profesor => {

            if(profesor.Nro_Documento.trim()===Nro_Documento.trim() && (profesor._id.trim()!==_id)){

                error=`YA EXISTE UN PROFESOR CON CON EL Nro de Documento: ${Nro_Documento}`

            }
            
        });

        if(error.trim()!==""){
            alert(error);
            return;
        }

        if(profesoreditado === null){
            agregarProfesor(Profesor)
        }

        else{
            editarProfesor(Profesor)
        }

        Cerrado();
        
    }

    const [Open, SetOpen] = useState(false);

    const Abierto = () =>{
        SetOpen(true)
    }
    
    const Cerrado = () =>{

        SetProfesor({

            _id:0,
            Nombre:"",
            Apellido:"",
            Tipo_Documento:"",
            Nro_Documento:"",
            Tipo:"",
            Telefono:"",
            Profesion:"",
            Email:"",

        })
        seleccionarProfesor(null);

        SetOpen(false)
    }

    const borrar = event =>{
        event.preventDefault();
        eliminarProfesor(_id);
        Cerrado();
    }

    const useStyles = makeStyles((theme) => ({
        container: {
          top : 0,
          paddingTop: theme.spacing(10),
          paddingBottom: theme.spacing(4),
          paddingLeft: theme.spacing(11),
          position: 'fixed', /** ese position tiene que ser absolute */
          maxHeight: '100vh',
          maxWidth: '100vw',
          overflowY: 'auto',
          right: 0,
        },
        paper: {
          padding: theme.spacing(2),
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
        },
        abajo: {
            top: "14px",
            margin: "2px"
        },
      }));
      const classes = useStyles();

    return(
        
        
        <Fragment>
            <Sidebar/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={Abierto}
                        >NUEVO REGISTRO</Button>

                        {Profesores.length === 0 ?
                            (<li className="entrada"><p>Sin Profesores</p></li>)
                            :<Tabla datos={Profesores} buscar="Nro_Documento" titulo="Filtrar por Numero de Documento" Nombre="Profesores" Editar={seleccionarProfesor}/>}

                        <Modal
                            Abierto={Open}
                            Cerrado={Cerrado}
                            Titulo="Profesores"
                        >
                        <Grid container>
                            <h1>Registrar un Profesor:</h1>
                            <Grid item xs={12}>
                            <TextField name="_id" value={_id} disabled variant="filled" margin="normal" label="ID" fullWidth placeholder="ID"></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="text" name="Nombre" value={Nombre} variant="filled" margin="normal" label="Primer Nombre del Docente" fullWidth placeholder="Primer Nombre del Docente" onChange={Almacenar}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="text" name="Apellido" value={Apellido} variant="filled" margin="normal" label="Primer Apellido del Docente" fullWidth placeholder="Primer Apellido del Docente" onChange={Almacenar}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <Select name="Tipo_Documento" className={classes.abajo} value={Tipo_Documento} variant="filled" margin="normal" placeholder="Tipo de Documento" onChange={Almacenar}>

                                <MenuItem value="C.I.">C.I.</MenuItem>
                                <MenuItem value="Pasaporte">Pasaporte</MenuItem>

                            </Select>
                
                            <TextField type="text" name="Nro_Documento" value={Nro_Documento} variant="filled" margin="normal" label="Nro del Documento" placeholder="Nro del Documento" onChange={Almacenar}></TextField>
                            <Select name="Tipo" value={Tipo} className={classes.abajo} variant="filled" margin="normal" placeholder="Tipo de Dedicacion del Docente" onChange={Almacenar}>

                                <MenuItem value="TC">TC</MenuItem>
                                <MenuItem value="DE">DE</MenuItem>
                                <MenuItem value="MT">MT</MenuItem>
                                <MenuItem value="TV">TV</MenuItem>
                            </Select>
                            </Grid>
                            
                            <Grid item xs={12}>
                            {/*aqui en el telefono el place holder tiene que decir el formato XXXX-XXX-XXXX */}
                            <TextField type="tel" name="Telefono" value={Telefono} variant="filled" margin="normal" label="Numero de Telefono del Docente" fullWidth placeholder="XXXX-XXX-XXXX" pattern ="[0-9]{4}-[0-9]{3}-[0-9]{4}" onChange={Almacenar}/>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="text" name="Profesion" value={Profesion} variant="filled" margin="normal" label="Profesion del Docente" fullWidth placeholder="Profesion del Docente" onChange={Almacenar}/>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="email" name="Email" value={Email} variant="filled" margin="normal" label="Correo del docente" fullWidth placeholder="Correo del docente" onChange={Almacenar}/>
                            </Grid>
                            <Grid item xs={3}>
                            <Button fullWidth variant="contained" color="primary" size="small" onClick={onSubmit}>Salvar</Button>
                            </Grid>
                            {profesoreditado !== null ? <Button color="secondary" variant="contained" size="small" onClick={borrar}>Eliminar</Button>:null}
                            </Grid>
                        </Modal>

                    </Paper>
                </Grid>
            </Container>

        </Fragment>
    );
}

export default Profesores;