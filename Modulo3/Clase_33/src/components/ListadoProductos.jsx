import { useCarritoStore } from "../store/carritoStore";

//Json local o consumirlo de una API
const productosDisponibles = [
  { id: 1, nombre: "🍕 Pizza", precio: 1500 },
  { id: 2, nombre: "🍔 Hamburguesa", precio: 1200 },
  { id: 3, nombre: "🌮 Tacos", precio: 800 },
  { id: 4, nombre: "🍟 Papas Fritas", precio: 500 },
  { id: 5, nombre: "🥤 Gaseosa", precio: 400 },
];

export const ListadoProductos = () => {
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);
  return (
    <div>
      <h3>Productos disponibles</h3>
      <div>
        {productosDisponibles.map((producto) => (
          <div key={producto.id}>
            <span>{producto.nombre}</span>
            <span>{producto.precio}</span>
            <button onClick={() => agregarProducto()}>Agregar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
