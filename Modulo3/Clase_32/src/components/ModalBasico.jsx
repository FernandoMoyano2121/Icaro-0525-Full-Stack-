import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

export const ModalBasico = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  //Funciones
  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <div>
      <section>
        <Typography variant="h6">Modal/Dialogo</Typography>
        <Button onClick={abrirModal} variant="contained">
          Abrir Modal
        </Button>
        <Dialog fullWidth open={modalAbierto}>
          <DialogTitle>Modal de Ejemplo</DialogTitle>
          <DialogContent>
            <Typography>Este es el contenido</Typography>
            <Button onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={cerrarModal}>Aceptar</Button>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
};
