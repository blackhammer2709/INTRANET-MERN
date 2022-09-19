import React, { useContext, useState, useEffect}from "react";
import { Button, MenuItem, Select, TextField  } from '@material-ui/core';

//import FullCalendar from '@fullcalendar/react';
import {Calendar} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';

//import Calendario from '../../../componentes/Calendario/Calendario';

import Sidebar from "../../../componentes/Sidebar/Sidebar";
import Modal from '../../../componentes/Modal/Modal';

import HorarioContext from "../../../context/Horarios/HorarioContext";
import CarreraContext from "../../../context/Crud/Carrera/CarreraContext";
import MateriaContext from '../../../context/Crud/Materias/MateriaContext'
import ProfesorContext from '../../../context/Crud/Profesores/ProfesorContext';
import SalonContext from '../../../context/Crud/Salones/SalonContext';
import SeccionContext from '../../../context/Crud/Secciones/SeccionContext';

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
const Horarios = () => {

    const horarioContext = useContext(HorarioContext);
    const carreraContext = useContext(CarreraContext);
    const materiaContext = useContext(MateriaContext);
    const profesorContext = useContext(ProfesorContext);
    const salonContext = useContext(SalonContext);
    const seccionContext = useContext(SeccionContext);

    const {Clases,
        claseeditada,
        obtenerClases,
        agregarClase,
        eliminarClase,
        editarClase,
        seleccionarClase,
    } = horarioContext;

    const {Carreras} =carreraContext;
    const {Materias} =materiaContext;
    const {Profesores} =profesorContext;
    const {Salones} =salonContext;
    const {Secciones} =seccionContext;

    
    useEffect(()=>{

        console.log("holis")

    },[Clases])

    const [Clase, SetClase] = useState({

        id:"",
        backgroundColor: "#000000",
        textColor: "#ffffff",
        start: "07:00:00",
        title: "",
        end: "07:45:00",
        Profesor: "",
        Salon: "",
        Seccion: {
            Carrera:"",
            Semestre:0,
            Identificador:""
        }

    });

    const [Duracion, SetDuracion] = useState([]);

    const{ id, backgroundColor, textColor,title, start, end, Profesor, Salon, Seccion } = Clase;
    const {Carrera, Semestre, Identificador} = Seccion;

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
            margin: "6px"
        },
        tamaño1: {
            width: "80px",
            margin: "6px"
        },
    }));
    const classes = useStyles();

    const Almacenar = (event) =>{

        let i = 1;
        if(event.target.name === "Carrera" ||event.target.name === "Semestre" || event.target.name === "Identificador"){
            
            if(event.target.name==="Carrera"){
                let prueba = []
                while(i<=event.target.value.Duracion){
                    prueba.push(i);
                    SetDuracion(prueba);
                    i++
                }
                SetClase({

                    ...Clase, 
                    Seccion:{
                        ...Seccion, 
                        [event.target.name]:event.target.value
                    },
                })
            }
    
            else{
                SetClase({

                    ...Clase, 
                    Seccion:{
                        ...Seccion, 
                        [event.target.name]:event.target.value
                    },
                })
            }
        
        }
        
        else{
            SetClase({
                
                ...Clase, [event.target.name]: event.target.value,
                end:`${start.split("T")[0]}T${final}`
            
            })
        }

        console.log(Clase);

    }

    const onSubmit = event =>{
        event.preventDefault();
        let error = "";
        SetClase({
            ...Clase,
            end:`${start.split("T")[0]}T${final}`
        })

        const nuevoI = new Date(start);
        const nuevoF = new Date(end);

        if(nuevoI>=nuevoF){
            alert("El final de la clase no puede ser antes o a la vez que el comienzo de la misma");
            return
        }

        Clases.forEach(clase =>{

            const inicia = new Date(clase.start.substring(0,19));
            const termina = new Date(clase.end.substring(0,19));

            if(nuevoI.getDay()===inicia.getDay()){
                
                //console.log(`caso ${clase.title}:`);
                //console.log("horas");
                //console.log(nuevoF<= inicia);
                //console.log(nuevoI >= termina)
                //console.log(nuevoF<= inicia || nuevoI >= termina);
                //console.log("profesor");
                //console.log(Profesor!==clase.Profesor)
                //console.log(Salon !== clase.Salon)
                //console.log(Profesor!==clase.Profesor && Salon !== clase.Salon)
                //console.log(id===clase.id);
                //console.log("final");
                //console.log(((nuevoF<= inicia || nuevoI >= termina)||(Profesor!==clase.Profesor && Salon !== clase.Salon))||(id!==clase.id))
                if(((nuevoF<= inicia || nuevoI >= termina)||(Profesor!==clase.Profesor && Salon !== clase.Salon))||(id===clase.id)){
                    console.log(`${title} no se solapa con ${clase.title}`)
                }

                else{
                    error=`ERROR: ${title} se solapa con ${clase.title} Seccion:${clase.Seccion.Carrera} Semestre:${clase.Seccion.Semestre} Salon:${clase.Salon} Profesor:${clase.Profesor} `
                }
            }
        })
        console.log(Clase);

        if(title.trim()==="" || Profesor.trim()==="" || Salon.trim()===""|| Carrera==="" || Semestre===0|| Identificador.trim()===""){

            alert("Debe Ingresar todos los datos");
            return
        }

        if(error.trim()!==""){
            alert(error);
            return;
        }

        if(claseeditada===null){
            agregarClase(Clase)
        }
        else{
            editarClase(Clase)
        }

        Cerrado(event);

    }

    const [Horas, SetHoras] = useState({
        comienzo:"07:00:00",
        final:"07:45:00"
    });

    const {comienzo, final} = Horas

    //State para abrir y cerrar modal MEJORAR
    const [Open, SetOpen] = useState(false);

    const Abierto = () =>{
        SetOpen(true)
    }
    
    const Cerrado = () =>{

        SetHoras({
            comienzo:"07:00:00",
            final:"07:45:00"
        })
        SetClase({
            id:"",
            backgroundColor: "#000000",
            textColor: "#ffffff",
            start: "07:00:00",
            title: "",
            end: "07:45:00",
            Profesor: "",
            Salon: "",
            Seccion: {
                Carrera:Carrera,
                Semestre:Semestre,
                Identificador:Identificador
            }
        });
        SetOpen(false);


    }

    const borrar = event=>{
        event.preventDefault();
        eliminarClase(id);
        Cerrado();
    }

    const Calendario = ()=>{
        let calendar;
        let calendarEl = document.getElementById("calendar")

        calendar= new Calendar(calendarEl, {
                plugins:[timeGridPlugin, dayGridPlugin, interaction],
                initialView:"timeGridWeek",
                allDaySlot:false,
                events:Clases,
                eventDidMount:(evento)=>{

                    evento.el.querySelector('.fc-event-title').innerHTML= "<br>Docente: " +evento.event.extendedProps.Profesor +"<br>Salon: "+ evento.event.extendedProps.Salon;
                    /*evento.el.querySelector(".fc-event-main").style.fontWeight="bolder"
                    evento.el.querySelector(".fc-event-main").style.fontSize="10px"
                    evento.el.querySelector(".fc-event-main").style.textAlign="center"*/

                },
                hiddenDays:[0],
                slotLabelFormat:{
                    hour:'numeric',
                    minute:'2-digit',
                    meridiem:'short',
                },
                slotMinTime:'07:00:00',
                slotMaxTime:'18:15:00',
                slotDuration:'00:45:00',
                dayHeaderFormat:{
                    weekday:'long',
                },
                height:"100vh",
                expandRows:true,
                headerToolbar:{
                    left:"",
                    right:'dayGridMonth, timeGridWeek'
                },
                locale:"es",
                initialDate:'2021-07-10',
                showNonCurrentDates:false,
                editable:false,
                slotEventOverlap:false,
                selectOverlap:false,
                timeZone:'GMT-0400',
                eventTimeFormat:{
                    hour:'2-digit',
                    minute:'2-digit',
                    hour12:true
                },
                dateClick:event =>{
                    SetHoras({
                        ...Horas,
                        comienzo:event.dateStr.split("T")[1]
                    });
                    SetClase({
                        ...Clase,
                        start:event.dateStr
                    });
                    Abierto(event.jsEvent);
                },
                eventClick:event=>{
                    SetHoras({
                        ...Horas,
                        comienzo:event.event.start.toISOString().substring(0,19).split("T")[1],
                        final:event.event.end.toISOString().substring(0,19).split("T")[1]
                    });
                    SetClase({
                        ...Clase,
                        id:event.event.id,
                        backgroundColor:event.event.backgroundColor,
                        textColor:event.event.textColor,
                        start:event.event.start.toISOString().substring(0,19).split("T")[0],
                        title:event.event.title,
                        end:event.event.end.toISOString().substring(0,19).split("T")[0],
                        Profesor:event.event.extendedProps.Profesor,
                        Salon:event.event.extendedProps.Salon,
                    });
                    seleccionarClase(Clase)
                    Abierto();
                }

            });
            calendar.render();
        }
    return(
        
        <>
            <Sidebar/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>

                        <Grid>
                            <Typography>Seleccione una Carrera: <Select className={classes.tamaño} name="Carrera" value={Carrera} placeholder="Nombre de la Carrera de la Seccion" onChange={Almacenar}>
                                {Carreras.map((carrera, index) =>(
                                    
                                    <MenuItem key={index} value={carrera}>{carrera.Nombre}</MenuItem>
                                
                                ))}
                            </Select>
                            </Typography>
                            

                            <Typography>Seleccione el Semestre de la Carrera: {Carrera==="" ? null :
                                <Select className={classes.tamaño1} name="Semestre" value={Semestre} placeholder="Semestre de la Carrera" onChange={Almacenar}>

                                        {Duracion.map((semestre,index)=>{
                                            return(
                                                <MenuItem key={index} value={semestre}>{semestre}</MenuItem>
                                            )
                                        })}

                                </Select>
                            }</Typography>
                            
                            <Typography>Seleccione una Sección: {(Carrera==="" || Semestre===0) ? null:

                                <Select className={classes.tamaño1} name="Identificador" value={Identificador} onChange={Almacenar}>
                                    
                                    <MenuItem key="A" value="A">A</MenuItem>
                                    <MenuItem key="B" value="B">B</MenuItem>
                                    <MenuItem key="C" value="C">C</MenuItem>
                                    <MenuItem key="D" value="D">D</MenuItem>
                                    <MenuItem key="E" value="E">E</MenuItem>
                                    <MenuItem key="F" value="F">F</MenuItem>
                                    {/*console.log(Secciones.filter(seccion => seccion.Carrera===Carrera.Nombre && seccion.Semestre===Semestre))*/}
                                </Select>

                            }</Typography>
                            



                        </Grid>
                        <h1>Horarios</h1>
                        <div id="calendar"></div>
                        {(Carrera===""||Semestre===0||Identificador==="") ? null:
                            //<Calendario />
                            Calendario()
                        }
                        
                        <Button onClick={Abierto}/>
                        <Modal
                            Abierto={Open}
                            Cerrado={Cerrado}
                            Titulo="Horarios"
                        >
                            <Grid container>
                            <h1>Diseñar un Horario:</h1>
                            <Grid item xs={12}>
                            <TextField name="id" value={id} disabled variant="filled" margin="normal" label="ID" fullWidth placeholder="ID"></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField type="color" name="backgroundColor" value={backgroundColor} className={classes.tamaño} onChange={Almacenar}/>
                            <TextField type="color" name="textColor" value={textColor} className={classes.tamaño} onChange={Almacenar}/>
                            <TextField
                                name="start"
                                label="Inicio de Clase"
                                type="time"
                                className={classes.tamaño} 
                                value={comienzo}
                                InputLabelProps={{
                                    shrink: true,
                                    
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                    readOnly:true                                    
                                }}
                                sx={{ width: 150 }}
                            />
                            <TextField
                                name="end"
                                label="Final de Clase"
                                type="time"
                                className={classes.tamaño} 
                                value={final}
                                
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps:{
                                        min:"07:00:00",
                                        max:"17:30:00",
                                        step: 900, // 15 min
                                    }
                                }}
                                onChange={event =>{ 
                                    SetHoras({...Horas, final:event.target.value})
                                    SetClase({
                                        ...Clase,
                                        end:`${start.split("T")[0]}T${event.target.value}`
                                    })
                                }}
                                sx={{ width: 150 }}
                            />

                            </Grid>
                            
                            
                            <Grid item xs={12}>
                            <Select name="title" className={classes.tamaño} value={title} onChange={Almacenar}>
                                {
                                    Materias.map((materia,index)=>(
                                        <MenuItem key={index} value={materia.Codigo}>{materia.Nombre}</MenuItem>
                                    ))
                                }
                            </Select>
                            <Select name="Profesor" className={classes.tamaño} value={Profesor} onChange={Almacenar}>
                                {
                                    Profesores.map((profesor,index)=>(
                                        <MenuItem key={index} value={`${profesor.Nombre} ${profesor.Apellido}`}>{`${profesor.Nombre} ${profesor.Apellido}`}</MenuItem>
                                    ))
                                }
                            </Select>
                            <Select name="Salon" className={classes.tamaño} value={Salon} onChange={Almacenar}>
                                {
                                    Salones.map((salon,index)=>(
                                        <MenuItem key={index} value={salon.Nombre}>{salon.Nombre}</MenuItem>
                                    ))
                                }
                            </Select>
                            </Grid>

                            <Grid item xs={3}>
                            {claseeditada === null ? <Button fullWidth variant="contained" color="primary" size="small" onClick={onSubmit}>Salvar</Button>:<Button color="secondary" variant="contained" size="small" onClick={borrar}>Eliminar</Button>}
                            </Grid>
                            </Grid>
                        </Modal>
                    </Paper>
                </Grid>
            </Container>
        </>


    );

}

export default Horarios;

/*
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
<MuiPickersUtilsProvider utils={DateFnsUtils}>
<KeyboardTimePicker
    margin="normal"
    id="time-picker"
    name="start"
    label="Time picker"
    format="HH:mm:ss"
    value={start.split("T")[1]}
    onChange={Almacenar}
    KeyboardButtonProps={{
        'aria-label': 'change time',
    }}
/>
</MuiPickersUtilsProvider>



<FullCalendar

                                plugins={[timeGridPlugin, dayGridPlugin, interaction]}
                                initialView="timeGridWeek"
                                allDaySlot={false}
                                events={
                                    Clases
                                }
                                eventDidMount={evento =>{

                                    evento.el.querySelector('.fc-event-title').innerHTML= evento.event.title + "<br>Docente: " +evento.event.extendedProps.Profesor +"<br>Salon: "+ evento.event.extendedProps.Salon;
                                    
                                    evento.el.querySelector(".fc-event-main").style.fontWeight="bolder"
                                    evento.el.querySelector(".fc-event-main").style.fontSize="10px"
                                    evento.el.querySelector(".fc-event-main").style.textAlign="center"

                                }}
                                hiddenDays={[0]}
                                slotLabelFormat={{hour:'numeric', minute:'2-digit', meridiem:'short', hour12:true}}
                                slotMinTime='07:00:00'
                                slotMaxTime='18:15:00'
                                slotDuration='00:45:00'
                                dayHeaderFormat={{weekday:'long'}}
                                height="100vh"
                                expandRows={true}
                                headerToolbar={{left:'', right:'dayGridMonth, timeGridWeek'}}
                                locale='es'
                                initialDate='2021-07-10'
                                showNonCurrentDates={false}
                                editable={false}
                                slotEventOverlap={false}
                                eventOverlap={false}
                                selectOverlap={false}
                                timeZone='GMT-0400'
                                eventTimeFormat={{
                                    hour:'2-digit',
                                    minute:'2-digit',
                                    hour12:true
                                
                                }}
                                dateClick={event =>{
                                    //guardar datStr en start
                                    SetHoras({...Horas, 
                                        comienzo:event.dateStr.split("T")[1]})
                                    SetClase({
                                        ...Clase,
                                        start:event.dateStr,
                                    })
                                    Abierto(event.jsEvent)
                                }}
                                eventClick={clase=>{
                                    console.log(clase.event.start.toISOString().substring(0,19))
                                    SetHoras({
                                        ...Horas,
                                        comienzo:clase.event.start.toISOString().substring(0,19).split("T")[1],
                                        final:clase.event.end.toISOString().substring(0,19).split("T")[1]
                                    })
                                    SetClase({
                                        ...Clase,
                                        id:clase.event.id,
                                        backgroundColor:clase.event.backgroundColor,
                                        textColor:clase.event.textColor,
                                        start:clase.event.start.toISOString().substring(0,19),
                                        title:clase.event.title,
                                        end:clase.event.end.toISOString().substring(0,19),
                                        Profesor:clase.event.extendedProps.Profesor,
                                        Salon:clase.event.extendedProps.Salon,
                                        Seccion:clase.event.extendedProps.Seccion
                                    })
                                    console.log(clase.event.start)
                                    seleccionarClase(Clase)
                                    console.log(claseeditada)
                                    Abierto(clase.jsEvent)
                                    console.log(clase.event.start.toISOString())
                                }}
                                />

*/