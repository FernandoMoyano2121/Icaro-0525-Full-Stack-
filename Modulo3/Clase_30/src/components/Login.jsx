import React from "react";

export const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form action="">
        <div>
          <label>Nombre:</label>
          <input type="text" />
        </div>
        <br />
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
      </form>
    </div>
  );
};
