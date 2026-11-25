import { create } from "zustand";

// create construye el store global y devuelve un hook para usarlo en React.
export const useTamaStore = create((set) => ({
  //ESTADO INICIAL
  darkMode: false,

  //ACCIONES
  //Alternar tema
  // set recibe una actualización parcial y la combina con el estado existente.
  // state permite leer el valor actual para calcular el nuevo valor.
  toggleTema: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),

  //Acción: establecer tema especifico
  //setTema: (isDark) => set({ darkMode: isDark }),
}));
