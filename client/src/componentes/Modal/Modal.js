import React, { Fragment } from 'react';
import{
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

const Modal = ({
    Abierto,
    Cerrado,
    Titulo,
    Subtitulo,
    children
}) => {
    return (
        <Fragment>
            <Dialog
                fullWidth
                maxWidth="md"
                open={Abierto}
                onClose={Cerrado}
                aria-labelledby='max-width-dialog-title'
            >
                <DialogTitle id='max-width-dialog-title'>{Titulo}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{Subtitulo}</DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={Cerrado} color='primary'>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default Modal;