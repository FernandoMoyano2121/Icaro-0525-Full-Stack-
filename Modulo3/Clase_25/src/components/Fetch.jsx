import React, { useEffect, useState } from "react";

export const Fetch = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Listado de usuarios:</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.name}</li>
        ))}
      </ul>
    </div>
  );
};
