
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import tokenAuth from './config/tokenAuth.js';
import Login from './componentes/Login/Login.js';
import Main from './Vistas/Main/Main';
import Admin from './Vistas/Admin/Admin';

import Carreras from './Vistas/Modulos/Carrera/Carreras';
import Secciones from './Vistas/Modulos/Secciones/Secciones';
import Salones from './Vistas/Modulos/Salones/Salones';
import Materias from './Vistas/Modulos/Materias/Materias';
import Profesores from './Vistas/Modulos/Profesores/Profesores';
import Horarios from './Vistas/Modulos/Horarios/Horarios';

import AuthState from './context/Auth/AuthState.js';
import EntradasState from './context/Entradas/EntradasState';
import CarreraState from './context/Crud/Carrera/CarreraState';
import SeccionState from './context/Crud/Secciones/SeccionState';
import MateriaState from './context/Crud/Materias/MateriaState';
import SalonState from './context/Crud/Salones/SalonState';
import ProfesorState from './context/Crud/Profesores/ProfesorState';
import HorarioState from './context/Horarios/HorarioState';

import ChatState from './context/Chat/ChatState';


import RutaPrivada from './componentes/rutas/RutaPrivada';

//revisar token

const token =localStorage.getItem('token');

if(token){
  tokenAuth(token);
}
const App= () =>{
  return(
    
    <div className="App">
      <AuthState>
      
      <Router>
          
          <Switch>
            <Route exact path="/" component={Login}/>
            {/**aqui podriamos colocar la ruta 404 o de no logueado */}
          </Switch>

          <Switch>

            <>
              
              {/*reitero que me gustaria que llamaramos a joffre el sabado para hablar con el y si puede revisar que tan mal optimizado esta el codigo */}
            <ChatState>
              
              <EntradasState>
              
                <RutaPrivada exact path="/Main" component={Main}/>
              
              </EntradasState>
              
              <CarreraState>
              <SeccionState>
              <SalonState>
              <MateriaState>
              <ProfesorState>
              
                <RutaPrivada exact path="/Carreras" component={Carreras}/>
              
              
                  <RutaPrivada exact path="/Secciones" component={Secciones}/>

                <RutaPrivada exact path="/Salones" component={Salones}/>
              

              
                <RutaPrivada exact path="/Materias" component={Materias}/>
              
              
              
                <RutaPrivada exact path="/Profesores" component={Profesores}/>
              
              
              <HorarioState>
                
                <RutaPrivada exact path="/Calendario" component={Horarios}/>
              
              </HorarioState>
              </ProfesorState>
              </MateriaState>
              </SalonState>
              </SeccionState>
              </CarreraState>
              
                <RutaPrivada exact path="/Admin" component={Admin}/>

            </ChatState>
            
          </>
          
          </Switch>
          
        
      </Router>
      </AuthState>
    </div>

);
}
export default App;

//aqui es donde se mete todo el codigo
//router y route son para manejar direccionamientos tengo que investigarlo un poco mas pero es eso