import { FormGroup, TextField } from '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';
import React, {useState, useEffect} from 'react';

const Tabla = ({datos, buscar,titulo, Editar, Nombre}) => {

    const [ backup , setBackup ] = useState([]);
    const [rows, setRows] = useState([]);
    
    useEffect(()=>{

        if(datos){
            setRows(datos);
            setBackup(datos);
        }
    },[datos]);

    const cabecera = Object.keys(datos[0]).map(item=>{
        return(
            {
                field:`${item}`,
                headerName:`${item}`,
                flex:10,
                editable:false
            }
        )
    })

    const [busqueda, SetBusqueda] = useState("");

    /*
    const onClick = event =>{

        
        event.target.closest("tr").childNodes.forEach(element => {

            console.log(element.textContent);
            //console.log(element.innerHTML);

        });
    }
    */

    const Filtrar = (event) =>{

        SetBusqueda(event.target.value);

        var text = event.target.value.toUpperCase();
        const data = backup;

        const newData = data.filter(item => {
            
            const itembuscar = item[buscar].toUpperCase();
            return itembuscar.indexOf(text) > -1

        })

        if (newData.length !== data.length){
            setRows(newData);
        } else{
            setRows(backup);
        }

    }

    const Buscador = () => {

        //funcion para filtrado dinamico
    
        return ( 
            <div className="buscador">
    
                <FormGroup>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    placeholder={titulo}
                    autoFocus
                    value={busqueda}
                    onChange={Filtrar}
                />
                </FormGroup>
            </div>
        );
    }
          /*valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${
              params.getValue(params.id, 'lastName') || ''
            }`,*/
    return (
        <>
        <Buscador /> {/*voy a desarrollar el buscador aqui pero una vez terminado lo movere al app.js como lo hice con el nav bar para que todos los modulos (menos el main) lo tengan incluido  */}
        
        <h1>{Nombre}</h1>
            
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={cabecera}
        pageSize={5}
        onRowSelected={event => Editar(event.data)}
        getRowId={(row)=>row._id}
      />
    </div>
        </>
    );
}

export default Tabla;

/*

    <table>
                <thead>
                    <tr>
                        {cabecera.map(valor =>{
                            return(
                                
                                <th key={valor}>{valor}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(registro =>{
                        return(
                            <tr key={registro["ID"]}>
                                {cabecera.map((valor, index) =>{
                                    return(
                                        <td key={index} onClick={onClick}>{registro[valor]}</td>
                                    )
                                })}
                                <td>
                                    <button type="button" className="btn btn-primario" onClick={()=>{Editar(registro)}}>Editar</button>
                                    <button type="button" className="btn btn-secundario" onClick={()=>Eliminar(registro.ID)}>Eliminar &times;</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

*/