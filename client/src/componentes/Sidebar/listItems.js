import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Link } from "react-router-dom";



export const mainListItems = (Modulos) => (
  
  <div>
    {/*Modulos.map(modulo => modulo)*/}
    <ListSubheader inset>Modulos</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/carreras">Carreras</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ScatterPlotIcon />
      </ListItemIcon>
      <Link to="./secciones">Secciones</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <Link to="./salones">Salones</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ImportContactsIcon />
      </ListItemIcon>
      <Link to="./materias">Materias</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SupervisorAccountIcon />
      </ListItemIcon>
      <Link to="./profesores">Profesores</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <Link to="./calendario">Horarios</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <Link to="./admin">Admin</Link>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Chat</ListSubheader>
    <ul>
      
    </ul>
  </div>
);
