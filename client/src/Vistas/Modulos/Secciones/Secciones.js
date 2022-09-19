import React, {Fragment, useContext, useEffect, useState}from "react";
import { Button, MenuItem, Select  } from '@material-ui/core';
import Modal from '../../../componentes/Modal/Modal';

import Tabla from '../../../componentes/Tabla/Tabla';

import SeccionContext from '../../../context/Crud/Secciones/SeccionContext';
import CarreraContext from '../../../context/Crud/Carrera/CarreraContext';
import Sidebar from "../../../componentes/Sidebar/Sidebar";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const Secciones = () => {

    const seccionContext = useContext(SeccionContext);
    const carreraContext = useContext(CarreraContext);

    const {Secciones, seccioneditada, obtenerSecciones, agregarSeccion, eliminarSeccion, seleccionarSeccion, editarSeccion} = seccionContext;
    const {Carreras, obtenerCarrera} = carreraContext;

    useEffect(()=>{

        obtenerSecciones();
        obtenerCarrera();

    },[]);

    useEffect(()=>{

        if(seccioneditada !== null){
            SetSeccion(seccioneditada);
            Abierto();
        }
        else{
            SetSeccion({
                _id:0,
                Carrera:"",
                Semestre: 0,
                Jornada:"",
                Presencial:"",
                Indice:"",
                Cantidad_Estudiantes:0,
            })
        }
    },[seccioneditada]);

    const [Seccion, SetSeccion] = useState({
                _id:0,
                Carrera:"",
                Semestre: 0,
                Jornada:"",
                Presencial:"",
                Indice:"",
                Cantidad_Estudiantes:0,
    });

    const {_id,Carrera, Semestre, Jornada, Presencial, Indice, Cantidad_Estudiantes} = Seccion;

    const  Almacenar = (event) =>{
        
        event.preventDefault();
        if (event.target.name === "Semestre"||event.target.name === "Cantidad_Estudiantes"){

            SetSeccion({

                ...Seccion, [event.target.name]: parseInt(event.target.value),
            
            })

        }
        
        else{
            SetSeccion({

                ...Seccion, [event.target.name]: event.target.value,
            
            })
        }
        
    }

    const onSubmit = event =>{
        event.preventDefault();

        if(Carrera.trim() === "" || Semestre < 1 || Jornada==="" || Presencial===""|| Indice.trim()===""||Cantidad_Estudiantes < 12){
            
            alert("Debes ingresar los datos");
            return;

        }

        let error="";
        Secciones.forEach(seccion => {

            if((seccion.Carrera.trim()===Carrera && seccion.Semestre===Semestre && seccion.Indice === Indice)&& (seccion._id.trim()!==_id)){
                error=` YA EXISTE UNA SECCION ${Indice} PERTENECIENTE A LA CARRERA: ${Carrera}, SEMESTRE: ${Semestre}`
            }
            
        });

        if(error.trim()!==""){
            alert(error);
            return
        }

        if(seccioneditada === null){

            agregarSeccion(Seccion)

        }
        else{
            editarSeccion(Seccion);
        }

        Cerrado();

    }

    const [Open, SetOpen] = useState(false);

    const Abierto = () =>{
        SetOpen(true)
    }
    
    const Cerrado = () =>{
        
        SetSeccion({

            _id:0,
            Carrera:"",
            Semestre: 0,
            Jornada:"",
            Presencial:"",
            Indice:"",
            Cantidad_Estudiantes:0,
        })
        seleccionarSeccion(null);
        SetOpen(false)
    }

    const borrar = event =>{
        event.preventDefault();
        eliminarSeccion(_id);
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
            top: "2px",
            margin: "2px"
        },
        tamaño: {
            width: "200px",
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

                        {Secciones.length === 0 ?
                            (<li className="entrada"><p>Sin Secciones</p></li>)
                            :<Tabla datos={Secciones} buscar="Carrera" titulo="Filtrar por Carrera" Nombre="Secciones" Editar={seleccionarSeccion}/>}

                        <Modal
                            Abierto={Open}
                            Cerrado={Cerrado}
                            Titulo="Secciones"
                        >
                        <Grid container>
                        <h1>Registrar Secciones:</h1>
                        <Grid item xs={12}>
                
                            <TextField name="_id" value={_id} disabled variant="filled" margin="normal" label="ID" fullWidth placeholder="ID"></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <Select name="Carrera" value={Carrera} className={classes.abajo} variant="filled" margin="dense" placeholder="Nombre de la Carrera de la Seccion" onChange={Almacenar}>

                                {Carreras.map((carrera,index) =>{
                                    return(
                                        
                                        <MenuItem key={index} value={carrera.Nombre}>{carrera.Nombre}</MenuItem>
                                    )
                                })}

                            </Select>
                
                            <TextField type="number" name="Semestre" value={Semestre} className={classes.tamaño} InputProps={{inputProps:{min:1,max:9}}} variant="filled" margin="normal" label="Semestre de la Seccion" placeholder="Semestre de la Seccion" onChange={Almacenar}/>
                            </Grid>
                            <Grid item xs={12}>
                            <Select name="Jornada" value={Jornada} className={classes.abajo} variant="filled" margin="dense" placeholder="Jornada de la seccion" onChange={Almacenar}>

                                <MenuItem value="Diurno">Diurno</MenuItem>
                                <MenuItem value="Nocturno">Nocturno</MenuItem>

                            </Select>

                            <Select name="Presencial" value={Presencial} className={classes.abajo} variant="filled" margin="dense" placeholder="Tipo de Presencia de la Seccion" onChange={Almacenar}>

                                <MenuItem value="Presencial">Presencial</MenuItem>
                                <MenuItem value="No Presencial">No Presencial</MenuItem>

                            </Select>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="text" name="Indice" value={Indice} className={classes.tamaño} variant="filled" margin="normal" label="Indice de la Seccion (A, B, C, D, etc.)" placeholder="Indice de la Seccion (A, B, C, D, etc.)" onChange={Almacenar}/>

                            <TextField type="number" name="Cantidad_Estudiantes" value={Cantidad_Estudiantes} InputProps={{inputProps:{min:12,max:40}}} className={classes.tamaño} variant="filled" margin="normal" label="Cantidad de Estudiantes en la Seccion" placeholder="Cantidad de Estudiantes en la Seccion" onChange={Almacenar}/>
                            </Grid>
                            <Grid item xs={3}>
                            <Button fullWidth variant="contained" color="primary" size="small" onClick={onSubmit}>Salvar</Button>
                            </Grid>
                            {seccioneditada !== null ? <Button color="secondary" variant="contained" size="small" onClick={borrar}>Eliminar</Button>:null}
                            </Grid>
                        </Modal>
                    </Paper>
                </Grid>
            </Container>
        </Fragment>

    );
}

export default Secciones;