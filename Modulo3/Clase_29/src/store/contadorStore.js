import { create } from "zustand";

// create construye el store global y devuelve un hook para usarlo en React.
export const useContadorStore = create((set) => ({
  //ESTADO INICIAL
  contador: 0,

  //ACCIONES
  // set actualiza el estado; el objeto parcial se combina con el estado existente.
  // state contiene los valores actuales y permite calcular el siguiente valor.
  incrementar: () =>
    set((state) => ({
      contador: state.contador + 1,
    })),

  decrementar: () =>
    set((state) => ({
      contador: state.contador - 1,
    })),

  resetear: () =>
    set(() => ({
      contador: 0,
    })),
}));
