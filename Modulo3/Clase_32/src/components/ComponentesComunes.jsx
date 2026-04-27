import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

export const ComponentesComunes = () => {
  return (
    <div>
      <section>
        <Typography variant="h4">Botones</Typography>
        <Button variant="contained">Haz click aquí</Button>
      </section>
      <br />
      <br />
      {/* -------------------- */}
      <section>
        <Typography variant="h6">Campo de texto</Typography>
        <TextField></TextField>
      </section>

      {/* ---------------------- */}
      <Typography variant="h4">Cards</Typography>
      <section
        style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
      >
        <Card sx={{ maxWidth: 340 }} variant="outlined">
          <CardContent>
            <Typography variant="h5">Titulo de Tarjeta</Typography>
            <CardMedia
              alt="imagen"
              height="140"
              component="img"
              image="https://placehold.co/400"
            ></CardMedia>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              perspiciatis ea quasi dolor et adipisci iusto eaque. Repellendus,
              error? Consectetur?
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 340 }} variant="outlined">
          <CardContent>
            <Typography variant="h5">Titulo de Tarjeta</Typography>
            <CardMedia
              alt="imagen"
              height="140"
              component="img"
              image="https://placehold.co/400"
            ></CardMedia>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              perspiciatis ea quasi dolor et adipisci iusto eaque. Repellendus,
              error? Consectetur?
            </Typography>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
