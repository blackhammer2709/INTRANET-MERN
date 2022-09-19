import React, {Fragment, useContext, useState, useEffect}from "react";

import { Button, Select, MenuItem } from '@material-ui/core';

import Tabla from '../../../componentes/Tabla/Tabla';
import Modal from '../../../componentes/Modal/Modal';

import SalonContext from '../../../context/Crud/Salones/SalonContext';

import Sidebar from "../../../componentes/Sidebar/Sidebar";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const Salones = () => {

    const salonContext = useContext(SalonContext);

    const {Salones, saloneditado,obtenerSalones, agregarSalon, eliminarSalon, seleccionarSalon,editarSalon} = salonContext;
    
    useEffect(()=>{
        obtenerSalones();
    },[])
    useEffect(()=>{

        if(saloneditado !== null){

            SetSalon(saloneditado);
            Abierto();
        }

        else{

            SetSalon({

                _id:0,
                Nombre: "",
                Capacidad: 0,
                Tipo: ""

            })

        }
    },[saloneditado]);

    const [Salon, SetSalon] = useState({
        _id:0,
        Nombre: "",
        Capacidad: 0,
        Tipo: "",
    });

    const {_id,Nombre, Capacidad, Tipo} = Salon;

    const  Almacenar = (event) =>{

        event.preventDefault();
        if (event.target.name === "Capacidad"){

            SetSalon({

                ...Salon, [event.target.name]: parseInt(event.target.value),
            

            })
        }
        
        else{

            SetSalon({
                

                ...Salon, [event.target.name]: event.target.value,
            
            })
        }

    }

    const onSubmit = event =>{
        event.preventDefault();
        
        if(Nombre.trim() === "" || Capacidad<10||Tipo.trim()===""){
            
            alert("EL NOMBRE DEL SALON ES OBLIGATORIO, ASI COMO EL TIPO DEL SALON Y SU CAPACIDAD NO PUEDE SER MENOR A 10");
            return;

        }
        
        let error ="";

        Salones.forEach(salon => {
            
            if (salon.Nombre.trim()===Nombre.trim()&&(salon._id.trim()!==_id)) {
                error=`YA EXISTE UN SALON CON EL NOMBRE ${Nombre}`
            }
        });

        if (error.trim()!=="") {

            alert(error);
            return
            
        }

        if(saloneditado === null){
            agregarSalon(Salon);
        }

        else{
            editarSalon(Salon);
        }

        Cerrado();

    }

    const [Open, SetOpen] = useState(false);

    const Abierto = () =>{
        SetOpen(true)
    }
    
    const Cerrado = () =>{
        
        SetSalon({

            _id:0,
            Nombre: "",
            Capacidad: 0,
            Tipo: ""

        });
        seleccionarSalon(null)
        SetOpen(false)
    }

    const borrar = event=>{
        
        event.preventDefault();
        eliminarSalon(_id);
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
        tamaño: {
            width: "200px",
            margin: "2px"
        },
        abajo: {
            top: "2px"
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
            
                        {Salones.length ===0 ?
                            (<li className="entrada"><p>Sin Salones</p></li>)
                            :<Tabla datos={Salones} buscar="Tipo" Nombre="Salones" titulo="Filtrar por Tipo de Salon" Editar={seleccionarSalon}/>}

                        <Modal
                            Abierto={Open}
                            Cerrado={Cerrado}
                            Titulo="Salones"
                        >
                        <Grid container>
                        <h1>Registrar Salones:</h1>
                            <Grid item xs={12}>
                            <TextField name="_id" value={_id} disabled variant="filled" margin="normal" label="ID" fullWidth placeholder="ID"></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="text" name="Nombre" value={Nombre} variant="filled" margin="normal" label="Nombre o Codigo del Aula" fullWidth placeholder="Nombre o Codigo del Aula" onChange={(event)=>Almacenar(event)}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="number" name="Capacidad" value={Capacidad} className={classes.tamaño} InputProps={{inputProps:{min:12,max:40}}} variant="filled" margin="normal" label="Cuantos Estudiantes puede albergar" placeholder="Cuantos Estudiantes puede albergar" onChange={Almacenar}></TextField>
                            <Select name="Tipo" value={Tipo} className={classes.abajo} variant="filled" margin="dense" placeholder="Tipo de Aula" onChange={Almacenar}>

                                <MenuItem value="Aula">Aula</MenuItem>
                                <MenuItem value="Laboratorio">Laboratorio</MenuItem>
                                <MenuItem value="Otros">Otros</MenuItem>

                            </Select>
                            </Grid>
                                <Grid item xs={3}>
                                <Button fullWidth variant="contained" color="primary" size="small" onClick={onSubmit}>Salvar</Button>
                                </Grid>
                                {saloneditado !== null ? <Button color="secondary" variant="contained" size="small" onClick={borrar}>Eliminar</Button>:null}
                            </Grid>
                        </Modal>
                    </Paper>
                </Grid>
            </Container>
        </Fragment>
    );
}

export default Salones;