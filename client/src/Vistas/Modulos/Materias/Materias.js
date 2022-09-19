import React, {Fragment, useContext, useState, useEffect}from "react";

import { Button, Select, MenuItem } from '@material-ui/core';

import Modal from '../../../componentes/Modal/Modal';

import Tabla from '../../../componentes/Tabla/Tabla'

import MateriaContext from '../../../context/Crud/Materias/MateriaContext';

import Sidebar from "../../../componentes/Sidebar/Sidebar";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';

const Materias = () => {

    const materiaContext = useContext(MateriaContext);

    const {Materias, materiaeditada,obtenerMaterias, agregarMateria, eliminarMateria, seleccionarMateria, editarMateria} = materiaContext;
    
    useEffect(()=>{
        obtenerMaterias();
    },[])
    useEffect(()=>{

        if(materiaeditada!==null){
            SetMateria(materiaeditada);
            Abierto();
        }
        else{

            SetMateria({

                _id:0,
                Codigo:"",
                Nombre: "",
                UC:0,
                HT:0,
                HP:0,
                HL:0,
                Semestre:0,
                Prelacion:"",

            })
        }

    }, [materiaeditada]);

    const [Materia, SetMateria] = useState({
        _id:0,
        Codigo:"",
        Nombre: "",
        UC:0,
        HT:0,
        HP:0,
        HL:0,
        Semestre:0,
        Prelacion:"",
    });

    const {_id,Codigo,Nombre,UC,HT,HP,HL,Semestre,Prelacion} = Materia;

    const  Almacenar = (event) =>{
        
        event.preventDefault();
        if (event.target.name === "Codigo"||event.target.name === "Nombre"||event.target.name === "Prelacion"){

            SetMateria({

                ...Materia, [event.target.name]: event.target.value.toUpperCase(),
            
            })            

        }
        
        else{

            SetMateria({

                ...Materia, [event.target.name]: parseInt(event.target.value),
            
            })

        }
        
    }

    const onSubmit = event =>{
        event.preventDefault();
        
        if(Codigo.trim() === "" || Nombre.trim() === "" ||Semestre<1||Prelacion.trim()===""){
            
            alert("EL NOMBRE, CODIGO Y PRELACION SON OBLIGATORIOS, Y EL SEMESTRE DEBE SER MAYOR A 0");
            return;

        }
        let error=""
        Materias.forEach(materia => {

            if((materia.Nombre.trim()===Nombre.trim()||materia.Codigo.trim()===Codigo.trim())&&(materia._id.trim()!==_id)){
                error=`YA EXISTE LA MATERIA ${Nombre} O EL CODIGO ${Codigo}`
            }
            
        });

        if(error.trim()!==""){
            alert(error);
            return
        }

        if(materiaeditada === null){

            agregarMateria(Materia)
        
        }

        else{
            editarMateria(Materia)
        }
        
        Cerrado();

    }

    const [Open, SetOpen] = useState(false);

    const Abierto = () =>{
        SetOpen(true)
    }
    
    const Cerrado = () =>{
        
        SetMateria({

            _id:0,
            Codigo:"",
            Nombre: "",
            UC:0,
            HT:0,
            HP:0,
            HL:0,
            Semestre:0,
            Prelacion:"",

        })
        seleccionarMateria(null);

        SetOpen(false)

    }

    const borrar = event =>{
        event.preventDefault();
        eliminarMateria(_id);
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
            width: "150px",
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

                        {Materias.length === 0 ?
                            (<li className="entrada"><p>Sin Materias</p></li>)
                            :<Tabla datos={Materias} buscar="Nombre" titulo="Filtrar por Nombre de Materia" Nombre="Materias" Editar={seleccionarMateria}/>}


                        <Modal
                            Abierto={Open}
                            Cerrado={Cerrado}
                            Titulo="Materias"
                        >
                        <Grid container>
                        <h1>Registrar materias</h1>
                            
                            <Grid item xs={12}>
                            <TextField name="_id" value={_id} disabled variant="filled" margin="normal" label="ID" fullWidth placeholder="ID"></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="text" name="Codigo" value={Codigo} variant="filled" margin="normal" label="Codigo de la Materia" fullWidth placeholder="Codigo de la Materia" onChange={Almacenar}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="text" name="Nombre" value={Nombre} variant="filled" margin="normal" label="Nombre de la Materia" fullWidth placeholder="Nombre de la Materia" onChange={Almacenar} ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type ="number" className={classes.tamaño} InputProps={{inputProps:{min:0,max:100}}} name="UC" value={UC} variant="filled" margin="normal" label="Unidades de Credito"  placeholder="Unidades de Credito" onChange={Almacenar}></TextField>
                            <TextField type="number" className={classes.tamaño} InputProps={{inputProps:{min:1,max:24}}} name="HT" value={HT} variant="filled" margin="normal" label="Numero de Horas Teoricas" placeholder="Numero de Horas Teoricas" onChange={Almacenar}></TextField>
                            <TextField type="number" className={classes.tamaño} InputProps={{inputProps:{min:1,max:24}}} name="HP" value={HP} variant="filled" margin="normal" label="Numero de Horas Practicas" placeholder="Numero de Horas Practicas" onChange={Almacenar}></TextField>
                            <TextField type="number" className={classes.tamaño} InputProps={{inputProps:{min:1,max:24}}} name="HL" value={HL} variant="filled" margin="normal" label="Numero de Horas de Laboratorio" placeholder="Numero de Horas de Laboratorio" onChange={Almacenar}></TextField>
                            <TextField type="number" className={classes.tamaño} InputProps={{inputProps:{min:1,max:9}}} name="Semestre" value={Semestre} variant="filled" margin="normal" label="Semestre al que pertenece la Materia" placeholder="Semestre al que pertenece la Materia" onChange={Almacenar}></TextField>
                            <Select name="Prelacion" className={classes.abajo} value={Prelacion} variant="filled" margin="dense" onChange={Almacenar}>
                            <InputLabel id="demo-simple-select-filled-label">Codigo de la Prelacion</InputLabel>
                                <MenuItem key="S/P" value="S/P">S/P</MenuItem>
                                    {Materias.map((materia,index)=>{
                        
                                    return(
                                        <MenuItem key={index} value={materia.Codigo}>{materia.Codigo}</MenuItem>
                                    )

                                    })}

                            </Select>
                            </Grid>
                            <Grid item xs={3}>
                            <Button fullWidth variant="contained" color="primary" size="small" onClick={onSubmit}>Salvar</Button>
                            </Grid>
                            {materiaeditada !== null ? <Button color="secondary" variant="contained" size="small" onClick={borrar}>Eliminar</Button>:null}
                            </Grid>
                        </Modal>

                    </Paper>
                </Grid>
            </Container>

        </Fragment>
    );
}

export default Materias;