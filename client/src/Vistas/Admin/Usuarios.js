import React, {Fragment, useContext, useEffect, useState} from 'react';

import {Button} from '@material-ui/core'
import Modal from '../../componentes/Modal/Modal'
import Tabla from '../../componentes/Tabla/Tabla';
import AuthContext from "../../context/Auth/AuthContext";

import Sidebar from "../../componentes/Sidebar/Sidebar";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const Usuarios = () =>{

    const authContext = useContext(AuthContext);
    const{Usuarios, agregarUsuario,obtenerUsuario, usuarioeditado, editarUsuario, eliminarUsuario, seleccionarUsuario,}=authContext;
    
    //en caso de que registro erroneo

    useEffect(()=>{

        if(usuarioeditado!== null){
            SetUsuario(usuarioeditado);
            Abierto();
        }
        else{
            SetUsuario({
                _id:0,
                Nombre:"",
                Cedula:"",
                Clave:"",
                Admin:false
            })
        }

    },[usuarioeditado])

    const [Usuario, SetUsuario] = useState({
        _id:0,
        Nombre:"",
        Cedula:"",
        Clave:"",
        Admin:false
    });

    const {_id, Nombre, Cedula, Clave} = Usuario;

    const  Almacenar = (event) =>{
        
        event.preventDefault();
        SetUsuario({
            ...Usuario, [event.target.name]: event.target.value,
        });
    }

    const onSubmit = event =>{
        
        event.preventDefault();

        if(Nombre.trim()==="" || Cedula.trim()==="" || Clave.trim()===""){
            alert("debe ingresar los datos");
            return;
        }

        if(usuarioeditado === null){
            agregarUsuario(Usuario)
        }
        else{
            editarUsuario(Usuario)
        }
        Cerrado();
    }

    const [Open, SetOpen] = useState(false);

    const Abierto = () =>{
        SetOpen(true)
    }
    
    const Cerrado = () =>{
        SetUsuario({
            id:0,
            Nombre:"",
            Cedula:"",
            Clave:"",
            Admin:false
        });
        seleccionarUsuario(null);
        SetOpen(false);

    }

    const borrar = event=>{
        event.preventDefault();
        eliminarUsuario(_id);
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
      }));
      const classes = useStyles();
      
    return(
        <>
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
            
                        {Usuarios.length === 0 ?
                            (<li className="entrada"><p>Sin Usuarios</p></li>)
                            :<Tabla datos={Usuarios} buscar="Nombre" titulo="Filtrar por Nombre de Carrera" Editar={seleccionarUsuario}/>
                        }
            
                        <Modal
                            Abierto={Open}
                            Cerrado={Cerrado}
                            Titulo="Hola"
                        >
                            <h1>HOLIS</h1>
                            <input name="_id" value={_id} disabled></input>
                            <input type="text" name="Nombre" value={Nombre} placeholder="Nombre del Usuario" onChange={Almacenar}/>
                            <input type="text" name="Cedula" value={Cedula} placeholder="Cedula del Usuario" onChange={Almacenar}/>
                            <input type="text" name="Clave" value={Clave} placeholder="Clave del Usuario" onChange={Almacenar}/>
                            <button onClick={onSubmit}>Salvar</button>
                            {usuarioeditado !== null ? <button onClick={borrar}>Eliminar</button>:null}
                        </Modal>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}

export default Usuarios;