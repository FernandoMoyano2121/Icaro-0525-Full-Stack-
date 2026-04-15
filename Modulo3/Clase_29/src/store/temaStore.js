import { create } from "zustand";

export const useTamaStore = create((set) => ({
  //ESTADO INICIAL
  darkMode: false,

  //ACCIONES
  //Alternar tema
  toggleTema: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),

  //Acción: establecer tema especifico
  //setTema: (isDark) => set({ darkMode: isDark }),
}));
