import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListadoUsuarios from "./ListadoUsuarios";
import CajaDeMensajes from './CajaDeMensajes';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
  },
}));

export default function ContenedorChat() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message" align="center">Listado de usuarios:</Typography>
            </Grid>
        </Grid>
          <List>
            <ListadoUsuarios/>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <CajaDeMensajes/>
      </main>
    </div>
  );
}