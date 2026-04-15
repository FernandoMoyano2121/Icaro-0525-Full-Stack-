import { useContadorStore } from "../store/ContadorStore";

const ContadorBasico = () => {
  const { contador, incrementar, decrementar, resetear } = useContadorStore();

  return (
    <div style={styles.container}>
      <h2>Contador Basico con Zustand</h2>

      <div style={styles.display}>
        <span style={styles.numero}>{contador}</span>
      </div>

      <div style={styles.botones}>
        <button onClick={decrementar} style={styles.boton}>
          Decrementar
        </button>
        <button onClick={resetear} style={styles.botonReset}>
          Resetear
        </button>
        <button onClick={incrementar} style={styles.boton}>
          Incrementar
        </button>
      </div>
    </div>
  );
};

//styles.container
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  display: {
    background: "#f0f0f0",
    padding: "30px",
    borderRadius: "10px",
    margin: "20px 0",
  },
  numero: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#333",
  },
  botones: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  boton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    background: "#007bff",
    color: "white",
  },
  botonReset: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    background: "#6c757d",
    color: "white",
  },
};

export default ContadorBasico;
