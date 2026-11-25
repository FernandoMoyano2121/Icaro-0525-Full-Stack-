export const Dashboard = ({ setIsAuthenticated }) => {
  return (
    <div>
      <h1>Dashboard Privado</h1>
      <p>Solo ves esto porque iniciaste sesión.</p>
      <button onClick={() => setIsAuthenticated(false)}>Cerrar sesión</button>
    </div>
  );
};
