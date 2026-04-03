import React from "react";

const Alumno = ({ alumnos }) => {
  return (
    <>
      <ul style={{ listStyle: "none" }}>
        {alumnos.map((alumno) => (
          <div>
            <li key={alumno.id}></li>
            <h4>{alumno.nombre}</h4>
            {/* <img src={alumno.img} alt={alumno.nombre}/> */}
          </div>
        ))}
      </ul>
    </>
  );
};

export default Alumno;
