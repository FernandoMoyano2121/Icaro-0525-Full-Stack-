import { create } from "zustand";

export const useCarritoStore = create((set, get) => ({
  //ESTADO
  items: [],
  //Ejemplo de item:{id:1, nombre:"Producto1", precio:100, cantidad:1}

  //ACCIONES

  agregarProducto: (producto) =>
    set((state) => {
      //verificar si ya existe en el carrito
      const existe = state.items.find((item) => item.id === producto.id);

      if (existe) {
        return {
          items: state.items.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      }

      //Si no existe, lo agregamos con cantidad 1
      return {
        // ERROR → si hacemos ésto:
        // No Copiamos todos los elementos del array original
        // No Mantenemos la inmutabilidad
        // No modificamos state.items
        //items: [state.items, { ...producto, cantidad: 1 }],

        // SOLUCION ↴
        items: [...state.items, { ...producto, cantidad: 1 }],
      };
    }),

  eliminarProducto: (productoId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productoId),
    })),

  actualizarCantidad: (productoId, cantidad) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productoId
          ? { ...item, cantidad: Math.max(0, cantidad) }
          : item
      ),
    })),

  vaciarCarrito: () => set({ items: [] }),

  //GETTER
  //Usamos get() para acceder al estado actual

  getTotalItems: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.cantidad, 0);
  },

  getTotalPrecio: () => {
    const state = get();
    return state.items.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  },
}));
