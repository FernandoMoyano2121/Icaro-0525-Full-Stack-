import React from "react";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { usuario, login, logout } = useAuth();
  return (
    <div>
      {usuario ? (
        <>
          <h1>Bienvenido: {usuario}</h1>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <>
          <button onClick={() => login("David")}>login</button>
        </>
      )}
    </div>
  );
};
