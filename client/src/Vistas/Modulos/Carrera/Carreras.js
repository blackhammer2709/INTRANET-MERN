import React, {Fragment, useContext, useState, useEffect}from "react";

import { Button} from '@material-ui/core';

import Modal from '../../../componentes/Modal/Modal';

import Tabla from '../../../componentes/Tabla/Tabla';

import CarreraContext from '../../../context/Crud/Carrera/CarreraContext';

import Sidebar from "../../../componentes/Sidebar/Sidebar";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const Carreras = () => {

    const carreraContext = useContext(CarreraContext);

    const {Carreras, carreraeditada, obtenerCarrera, agregarCarrera, eliminarCarrera, seleccionarCarrera, editarCarrera} = carreraContext;
    
    useEffect(()=>{
    
        obtenerCarrera()
    
    },[])
    
    useEffect(()=>{

        if(carreraeditada !== null){
            SetCarrera(carreraeditada)
            Abierto();
        }
        else{
            
            SetCarrera({
                _id:0,
                Nombre:"",
                Duracion:0,
            });

        }
    },[carreraeditada]);

    //state para almacenar carrera
    const [Carrera, SetCarrera] = useState({
        
        _id:"0",
        Nombre:"",
        Duracion:0,

    });

    const {_id, Nombre, Duracion} = Carrera;

    const  Almacenar = (event) =>{
        
        event.preventDefault();
        if(event.target.name === "Duracion"){

            SetCarrera({

                ...Carrera, [event.target.name]: parseInt(event.target.value),
        
            })

        }

        else{
            SetCarrera({

                ...Carrera, [event.target.name]: event.target.value.toUpperCase(),
        
            })
        }

    }

    const onSubmit = event =>{
        event.preventDefault();

        if(Nombre.trim() === "" || Duracion < 5){
            
            alert("EL NOMBRE NO PUEDE ESTAR VACIO Y LA DURACION NO PUEDE SER MAYOR DE 5 SEMESTRES");
            return;

        }
        let error =""
        Carreras.forEach(carrera => {
            
            if((carrera.Nombre.trim()===Nombre.trim()) && (carrera._id.trim()!==_id)){
                error=`YA EXISTE UNA CARRERA CON EL NOMBRE ${Nombre}`
            }
            
        });

        if(error.trim()!==""){
            alert(error);
            return
        }
        if(carreraeditada === null){
            agregarCarrera(Carrera)
        
        }
        else{
            editarCarrera(Carrera);
        }
        
        Cerrado();

    }
    
    //State para abrir y cerrar modal MEJORAR
    const [Open, SetOpen] = useState(false);

    const Abierto = () =>{
        SetOpen(true)
    }
    
    const Cerrado = () =>{
        SetCarrera({
            _id:0,
            Nombre:"",
            Duracion:0,

        });
        seleccionarCarrera(null);
        SetOpen(false);

    }

    const borrar = event=>{
        event.preventDefault();
        eliminarCarrera(_id);
        Cerrado();
    }
    //prueba de datos
    
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
            
                        {Carreras.length === 0 ?
                            (<li className="entrada"><p>Sin Carreras</p></li>)
                            :<Tabla datos={Carreras} buscar="Nombre" titulo="Filtrar por Nombre de Carrera" Nombre="Carreras" Editar={seleccionarCarrera}/>
                        }
            
                        <Modal
                            Abierto={Open}
                            Cerrado={Cerrado}
                            Titulo="Carrera"
                        >
                            <Grid container>
                            <h1>Registrar una Carrera:</h1>
                            <Grid item xs={12}>
                            <TextField name="_id" value={_id} disabled variant="filled" margin="normal" label="ID" fullWidth placeholder="ID"></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="text" name="Nombre" value={Nombre} variant="filled" margin="normal" label="Nombre de la Carrera" fullWidth placeholder="Nombre de la Carrera" onChange={(event)=>Almacenar(event)}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField InputProps={{inputProps:{min:5,max:9}}} type="number" name="Duracion" value={Duracion} placeholder="Duracion de la Carrera en Semestres" variant="filled" margin="normal" label="Duracion de la Carrera" fullWidth onChange={Almacenar}></TextField>
                            </Grid>
                            <Grid item xs={3}>
                            <Button onClick={onSubmit} fullWidth variant="contained" color="primary" size="small">Salvar</Button>
                            </Grid>
                            {carreraeditada !== null ? <Button color="secondary" variant="contained" size="small" onClick={borrar}>Eliminar</Button>:null}
                            </Grid>
                        </Modal>
                    </Paper>
                </Grid>
            </Container>
        </Fragment>
    );
}

export default Carreras;