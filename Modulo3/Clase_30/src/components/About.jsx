import React from "react";

export const About = () => {
  return (
    <div style={styles.pagina}>
      <h1>🏛️Acerca de nosotros</h1>
      <p>Esta es la página "About" de nuestra aplicación</p>
    </div>
  );
};

const styles = {
  pagina: {
    background: "#f8f9fa",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
  },
};
