import { FormGroup, TextField, Button } from '@material-ui/core';
import React from 'react';

const Filtrar = () =>{

    alert("filtrado");

}

const Buscador = ({buscar, titulo}) => {
    return ( 
        <div className="buscador">

            <FormGroup>
            <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                type="text"
                id={buscar}
                placeholder={titulo}
                autoFocus
            />
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={Filtrar}
            >
                Buscar
            </Button>
            </FormGroup>
        </div>
    );
}

export default Buscador;