# Zustand Cheat Sheet & Guía de Referencia

Una guía rápida y completa sobre los principales métodos, propiedades y hooks para gestionar el estado global utilizando **Zustand**, la librería minimalista y eficiente de React.

---

## 1. Creación del Store (`create`)

La función `create` es el núcleo de Zustand. Se utiliza para inicializar el store, definir el estado inicial y las acciones que lo modifican.

```javascript
import { create } from 'zustand'

const useStore = create((set, get, store) => ({
  // Estado inicial
  count: 0,
  user: null,

  // Acciones
  increment: () => set((state) => ({ count: state.count + 1 })),
  setUser: (user) => set({ user }),
}))
```

### Parámetros de la función creadora:
* **`set`**: Función para actualizar parcial o totalmente el estado.
* **`get`**: Función para leer el estado actual de forma sincrónica dentro de las acciones.
* **`store`**: Objeto que contiene metadatos y métodos avanzados del store (`getState`, `setState`, `subscribe`, `destroy`).

---

## 2. Métodos del Store (`StoreApi`)

El objeto `store` (el tercer parámetro en `create` o devuelto por `useStore`) proporciona una API imperativa para interactuar con el estado fuera de los componentes de React.

### `store.getState()`
Retorna el estado actual completo de manera sincrónica (fuera del ciclo de renderizado de React).
```javascript
const currentState = useStore.getState();
console.log(currentState.count);
```

### `store.setState(partialState, replace)`
Actualiza el estado de forma imperativa.
* **`partialState`**: Objeto parcial o función que retorna el nuevo estado.
* **`replace`** (opcional): Si es `true`, reemplaza por completo el estado anterior en lugar de fusionarlo (`merge`).
```javascript
useStore.setState({ count: 10 });
```

### `store.subscribe(listener)`
Permite escuchar los cambios en el estado. Retorna una función para cancelar la suscripción (`unsubscribe`).
```javascript
const unsubscribe = useStore.subscribe((state, previousState) => {
  console.log("El contador cambió de", previousState.count, "a", state.count);
});

// Para limpiar la suscripción cuando ya no se necesite
unsubscribe();
```

### `store.destroy()`
Elimina todos los listeners suscritos y limpia el store.
```javascript
useStore.destroy();
```

---

## 3. El Hook del Store (`useStore`)

Cuando utilizas el hook generado por `create` (ej. `useStore()`), puedes pasarle selectores opcionales para optimizar el rendimiento y evitar renders innecesarios.

### Uso Básico (Sin selector)
Se suscribe a todo el store (puede causar renders innecesarios si cambia otra propiedad).
```javascript
const state = useStore();
```

### Uso con Selector (Recomendado)
Extrae únicamente la porción de estado que necesitas. El componente solo se renderizará cuando esa propiedad específica cambie.
```javascript
const count = useStore((state) => state.count);
const increment = useStore((state) => state.increment);
```

---

## 4. Middleware Comunes

Zustand incluye middlewares potentes que se pueden encadenar al crear el store.

### `devtools`
Conecta tu store con las Redux DevTools del navegador para inspeccionar acciones y cambios de estado.
```javascript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools((set) => ({
    bears: 0,
    increaseBears: () => set((state) => ({ bears: state.bears + 1 })),
  }))
)
```

### `persist`
Guarda automáticamente el estado en `localStorage`, `sessionStorage` o almacenamiento personalizado para que persista al recargar la página.
```javascript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
    }),
    {
      name: 'app-storage', // Nombre clave en el storage
      storage: createJSONStorage(() => localStorage), // (Opcional) Por defecto usa localStorage
    }
  )
)