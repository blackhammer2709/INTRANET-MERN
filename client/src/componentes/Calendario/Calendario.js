//import React, {Fragment} from 'react';
//import FullCalendar from '@fullcalendar/react';
import{Calendar} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';

const Calendario = (clases,horas,set, abierto, cerrado) =>{

    let calendar;
    let calendarEl = document.getElementById("calendar")

    calendar= new Calendar(calendarEl, {
                plugins:[timeGridPlugin, dayGridPlugin, interaction],
                initialView:"timeGridWeek",
                allDaySlot:false,
                events:clases,
                eventDidMount:(evento)=>{

                    evento.el.querySelector('.fc-event-title').innerHTML= evento.event.title + "<br>Docente: " +evento.event.extendedProps.Profesor +"<br>Salon: "+ evento.event.extendedProps.Salon;                
                    evento.el.querySelector(".fc-event-main").style.fontWeight="bolder"
                    evento.el.querySelector(".fc-event-main").style.fontSize="10px"
                    evento.el.querySelector(".fc-event-main").style.textAlign="center"

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
                    console.log(event.dateStr);
                },
                eventClick:event=>{
                    console.log(event.event.id)
                    console.log(event.event.backgroundColor)
                    console.log(event.event.textColor)
                    console.log(event.event.start)
                    console.log(event.event.title)
                    console.log(event.event.end)
                    console.log(event.event.extendedProps.Profesor)
                    console.log(event.event.extendedProps.Salon)
                    console.log(event.event.extendedProps.Seccion)
                }

            });
            
    calendar.render();
    
}


export default Calendario;

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