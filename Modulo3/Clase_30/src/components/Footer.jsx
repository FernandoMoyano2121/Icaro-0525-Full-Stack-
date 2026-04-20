import React from "react";

export const Footer = () => {
  return (
    <div style={styles.footer}>
      <h2>Pie de pagina</h2>
    </div>
  );
};

const styles = {
  footer: {
    padding: "10px 20px",
    background: "#c08037",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background 0.3s",
    textAlign: "center",
  },
};
