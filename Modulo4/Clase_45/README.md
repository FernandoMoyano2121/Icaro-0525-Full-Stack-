# Clase 45 — ORM con Sequelize: Base de Datos `tienda`

## Descripción

Ejemplo incremental único que cubre todos los conceptos de la clase:
conexión a MySQL desde Node.js con **Sequelize + async/await**, definición de
modelos, CRUD completo con métodos de modelo y asociaciones N:M con eager loading.

Este ejemplo continúa trabajando con la base de datos `tienda` de la Clase 44,
pero en lugar de escribir SQL a mano usamos el ORM para interactuar con las tablas.

---

## Diseño de la Base de Datos

```
categorias                              productos
──────────────                         ──────────────────────
id (PK)                                id (PK)
nombre                                 nombre
descripcion                            descripcion
                                       precio
                                       stock
                                       activo
                                       creado_en
                                       actualizado_en
```

**Relación N:M** (muchos a muchos):
- Un producto puede pertenecer a múltiples categorías
- Una categoría puede contener múltiples productos
- Sequelize gestiona la tabla intermedia `producto_categoria` de forma transparente

---

## Estructura del Proyecto

```
Clase_45/
├── .env                          ← Variables de entorno (NO subir a git)
├── .env.example                  ← Plantilla de variables de entorno
├── package.json                  ← "type": "module" habilitado (ES Modules)
├── db/
│   └── conexion.js               ← Instancia de Sequelize (equivale al pool de Clase 44)
├── models/
│   ├── Categoria.js              ← Modelo que representa la tabla "categorias"
│   └── Producto.js               ← Modelo que representa la tabla "productos"
└── src/
    └── examples/
        ├── 01-test-conexion.js   ← Paso 1: authenticate()
        ├── 02-sync-modelos.js    ← Paso 2: sync({ force: true })
        ├── 03-crud-categorias.js ← Paso 3: findAll, findByPk, create, update, destroy
        ├── 04-crud-productos.js  ← Paso 4: where, Op, order, limit, bulkCreate
        └── 05-asociaciones.js    ← Paso 5: belongsToMany, include (eager loading)
```

---

## Instalación y Configuración

```bash
# 1. Instalar dependencias
npm install

# 2. Completar el archivo .env con tus credenciales de MySQL
#    DB_PASSWORD=tu_contraseña_real

# 3. Tener la base de datos "tienda" creada en MySQL
#    (puede estar vacía — el Paso 2 crea las tablas automáticamente)
```

---

## Sequelize — Documentación de referencia

### ¿Qué es un ORM?

Un **ORM (Object-Relational Mapper)** es una librería que actúa como puente
entre el código JavaScript y la base de datos relacional. En lugar de escribir
SQL a mano, trabajamos con objetos y métodos JavaScript que Sequelize traduce
a SQL internamente.

```bash
npm install sequelize mysql2
```

> Sequelize necesita `mysql2` instalado aunque no lo usemos directamente.
> Es el driver que usa internamente para conectarse a MySQL.

---

### Comparación con mysql2

| Con mysql2 (Clase 44) | Con Sequelize (esta clase) |
|---|---|
| `pool.execute('SELECT * FROM categorias')` | `Categoria.findAll()` |
| `pool.execute('INSERT INTO ...')` | `Categoria.create({ ... })` |
| `pool.execute('UPDATE ... WHERE id = ?', [id])` | `instancia.update({ ... })` |
| `pool.execute('DELETE ... WHERE id = ?', [id])` | `instancia.destroy()` |
| JOIN escrito a mano | `findAll({ include: Categoria })` |

Sequelize no reemplaza el conocimiento de SQL. Lo necesitás para entender
qué está pasando por debajo. Pero sí acelera el desarrollo y reduce errores de sintaxis.

---

### Modelos

Un **modelo** en Sequelize es una clase JavaScript que representa una tabla.
Cada instancia del modelo es una fila de esa tabla.

```js
import { DataTypes } from 'sequelize';
import sequelize from '../db/conexion.js';

const Categoria = sequelize.define(
    'Categoria',            // nombre del modelo
    {
        nombre: {
            type:      DataTypes.STRING(80),
            allowNull: false,
            unique:    true
        },
        descripcion: {
            type:      DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName:  'categorias',   // nombre exacto de la tabla en MySQL
        timestamps: false
    }
);

export default Categoria;
```

Equivalencia de tipos:

| DataTypes de Sequelize | Tipo SQL |
|---|---|
| `DataTypes.INTEGER` | `INT` |
| `DataTypes.STRING(n)` | `VARCHAR(n)` |
| `DataTypes.TEXT` | `TEXT` |
| `DataTypes.DECIMAL(10, 2)` | `DECIMAL(10,2)` |
| `DataTypes.BOOLEAN` | `TINYINT(1)` |
| `DataTypes.DATE` | `DATETIME` |

---

### sync() — Sincronización de modelos

`sequelize.sync()` compara los modelos con las tablas de MySQL y las crea o
modifica según el modo elegido:

| Modo | Comportamiento |
|---|---|
| `sync()` | Crea la tabla si no existe. Si ya existe, no hace nada. |
| `sync({ alter: true })` | Aplica las diferencias entre el modelo y la tabla existente. |
| `sync({ force: true })` | ⚠️ Borra y recrea la tabla desde cero. Destruye todos los datos. |

```js
// Deshabilitar FK antes de force:true para evitar errores de integridad referencial
await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
await sequelize.sync({ force: true });
await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
```

---

### Métodos CRUD de modelo

```js
// READ — todos los registros
const categorias = await Categoria.findAll();

// READ — por clave primaria
const categoria = await Categoria.findByPk(id);
// Devuelve null si no existe

// READ — con filtros
const productos = await Producto.findAll({
    where:      { activo: true },
    order:      [['nombre', 'ASC']],
    limit:      5,
    attributes: ['id', 'nombre', 'precio']   // columnas a devolver
});

// CREATE — insertar uno
const nueva = await Categoria.create({ nombre: 'Hogar', descripcion: '...' });
// nueva.id ya tiene el valor asignado por AUTO_INCREMENT

// CREATE — insertar muchos
await Producto.bulkCreate([
    { nombre: 'Notebook', precio: 350000 },
    { nombre: 'Mouse',    precio: 18000  }
]);

// UPDATE — sobre una instancia
await categoria.update({ descripcion: 'Nueva descripción' });

// DELETE — sobre una instancia
await categoria.destroy();
```

---

### Operadores (Op)

Los operadores reemplazan los operadores SQL dentro del objeto `where`:

```js
import { Op } from 'sequelize';

// WHERE precio > 50000
{ precio: { [Op.gt]: 50000 } }

// WHERE precio BETWEEN 10000 AND 100000
{ precio: { [Op.between]: [10000, 100000] } }

// WHERE nombre LIKE '%samsung%'
{ nombre: { [Op.like]: '%samsung%' } }
```

| Operador Sequelize | SQL equivalente |
|---|---|
| `Op.eq` | `=` |
| `Op.ne` | `!=` |
| `Op.gt` | `>` |
| `Op.gte` | `>=` |
| `Op.lt` | `<` |
| `Op.lte` | `<=` |
| `Op.like` | `LIKE` |
| `Op.between` | `BETWEEN` |
| `Op.in` | `IN (...)` |

---

### Asociaciones y eager loading

Con `belongsToMany` se declara la relación N:M entre dos modelos.
Sequelize gestiona la tabla intermedia automáticamente.

```js
// Declarar la relación (se hace una vez, antes de usar los modelos)
Producto.belongsToMany(Categoria, {
    through:    'producto_categoria',
    foreignKey: 'producto_id',
    otherKey:   'categoria_id'
});

Categoria.belongsToMany(Producto, {
    through:    'producto_categoria',
    foreignKey: 'categoria_id',
    otherKey:   'producto_id'
});

// Asignar / desasignar (Sequelize maneja la tabla intermedia)
await producto.addCategoria(categoria);       // INSERT en producto_categoria
await producto.removeCategoria(categoria);    // DELETE en producto_categoria

// Eager loading: traer los datos relacionados en la misma query (JOIN)
const productos = await Producto.findAll({
    include: {
        model:   Categoria,
        through: { attributes: [] }   // ocultar columnas de la tabla intermedia
    }
});
```

---

### Variables de entorno (.env)

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=tienda
DB_PORT=3306
PORT=3000
```

Se cargan con el paquete `dotenv` usando la sintaxis ES Modules:

```js
import 'dotenv/config';
// Debe importarse antes de cualquier acceso a process.env
```

---

### Errores comunes de Sequelize

| Error | Causa | Solución |
|---|---|---|
| `ACCESS_DENIED` | Usuario o contraseña incorrectos en `.env` | Verificar credenciales |
| `ECONNREFUSED` | El servicio MySQL no está corriendo | Iniciar MySQL |
| `ER_BAD_DB_ERROR` | La base de datos especificada en `DB_NAME` no existe | Crear la BD en Workbench |
| `Cannot drop table referenced by FK` | `force:true` intenta borrar una tabla referenciada | Usar `SET FOREIGN_KEY_CHECKS = 0` antes del sync |
| `SequelizeUniqueConstraintError` | Violación de restricción UNIQUE | Verificar que el valor no exista antes de insertar |

---

## Orden de Demostración en Clase

### Paso 1 — Verificar la conexión
```bash
node src/examples/01-test-conexion.js
```
Conceptos: `sequelize.authenticate()`, instancia de Sequelize, variables de entorno.

### Paso 2 — Sincronizar modelos
```bash
node src/examples/02-sync-modelos.js
```
Conceptos: `sync({ force: true })`, `logging: console.log` para ver el SQL generado, `SET FOREIGN_KEY_CHECKS`.

### Paso 3 — CRUD básico
```bash
node src/examples/03-crud-categorias.js
```
Conceptos: `findAll`, `findByPk`, `create`, `update`, `destroy`. Comparar con `02-crud-categorias.js` de Clase 44.

### Paso 4 — Filtros y consultas
```bash
node src/examples/04-crud-productos.js
```
Conceptos: `where`, `Op` (operadores), `order`, `limit`, `attributes`, `bulkCreate`.

### Paso 5 — Asociaciones
```bash
node src/examples/05-asociaciones.js
```
Conceptos: `belongsToMany`, `addCategoria`, `include` (eager loading). Comparar con los JOINs manuales de Clase 44.

---

## Conceptos Clave

| Concepto | Dónde se ve |
|----------|-------------|
| `"type": "module"` en package.json | `package.json` |
| Instancia de Sequelize | `db/conexion.js` |
| `import 'dotenv/config'` (ESM) | `db/conexion.js` |
| `async/await` con `try/catch` | Todos los archivos |
| Definición de modelo con `DataTypes` | `models/Categoria.js`, `models/Producto.js` |
| `tableName` y `timestamps` | `models/Categoria.js`, `models/Producto.js` |
| `sequelize.authenticate()` | `src/examples/01-test-conexion.js` |
| `sync({ force: true })` + `logging` | `src/examples/02-sync-modelos.js` |
| `SET FOREIGN_KEY_CHECKS` | `src/examples/02-sync-modelos.js` |
| `findAll` / `findByPk` / `create` / `update` / `destroy` | `src/examples/03-crud-categorias.js` |
| `bulkCreate` | `src/examples/04-crud-productos.js` |
| `Op.gt` / `Op.like` / `Op.between` | `src/examples/04-crud-productos.js` |
| `order` / `limit` / `attributes` | `src/examples/04-crud-productos.js` |
| `belongsToMany` | `src/examples/05-asociaciones.js` |
| `addCategoria` / `addCategorias` | `src/examples/05-asociaciones.js` |
| `include` (eager loading) | `src/examples/05-asociaciones.js` |
