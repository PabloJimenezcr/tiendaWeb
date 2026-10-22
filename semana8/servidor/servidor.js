
/* ==========================================
   semana 7 - importar express
   ========================================== */

// carga la libreria express
const express = require("express");


/* ==========================================
   semana 7 y 8 - configurar el servidor
   ========================================== */

// crea la aplicacion del servidor
const app = express();

// define el puerto del servidor
const PUERTO = 3000;


/* ==========================================
   semana 8 - datos iniciales de productos
   ========================================== */

// define los productos de prueba para la api
let productos = [
    {
        id: 1,
        nombre: "teclado mecanico",
        precio: 25000,
        categoria: "accesorios"
    },
    {
        id: 2,
        nombre: "mouse inalambrico",
        precio: 12000,
        categoria: "accesorios"
    },
    {
        id: 3,
        nombre: "monitor",
        precio: 85000,
        categoria: "pantallas"
    },
    {
        id: 4,
        nombre: "audifonos",
        precio: 18000,
        categoria: "audio"
    }
];


/* ==========================================
   semana 8 - middleware general
   ========================================== */

// permite interpretar solicitudes que contienen json
app.use(express.json());


/* ==========================================
   semana 8 - middleware de validacion
   ========================================== */

// comprueba los datos de un producto
const validarProducto = (req, res, next) => {
    const { nombre, precio, categoria } = req.body;

    if (
        typeof nombre !== "string" ||
        nombre.trim() === "" ||
        typeof categoria !== "string" ||
        categoria.trim() === "" ||
        precio === "" ||
        precio === null ||
        precio === undefined ||
        !Number.isFinite(Number(precio)) ||
        Number(precio) <= 0
    ) {
        return res.status(400).json({
            error: "nombre, categoria y precio valido son obligatorios"
        });
    }

    // continua con la ruta cuando los datos son validos
    next();
};


/* ==========================================
   semana 7 - ruta principal
   ========================================== */

// responde cuando se visita la direccion principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "servidor de tienda web funcionando",
        semana: 8
    });
});


/* ==========================================
   semana 7 - ruta de comprobacion
   ========================================== */

// permite comprobar que el servidor esta activo
app.get("/api/estado", (req, res) => {
    res.json({
        estado: "activo",
        mensaje: "la api de la tienda esta disponible"
    });
});


/* ==========================================
   semana 8 - consultar todos los productos
   ========================================== */

// devuelve la lista completa de productos
app.get("/api/productos", (req, res) => {
    res.json(productos);
});


/* ==========================================
   semana 8 - consultar un producto
   ========================================== */

// busca un producto por su identificador
app.get("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "el identificador debe ser un numero entero positivo"
        });
    }

    const producto = productos.find(item => item.id === id);

    if (!producto) {
        return res.status(404).json({
            error: "producto no encontrado"
        });
    }

    res.json(producto);
});


/* ==========================================
   semana 8 - crear un producto
   ========================================== */

// registra un producto nuevo
app.post("/api/productos", validarProducto, (req, res) => {
    const nuevoProducto = {
        id: productos.length > 0
            ? Math.max(...productos.map(item => item.id)) + 1
            : 1,
        nombre: req.body.nombre.trim(),
        precio: Number(req.body.precio),
        categoria: req.body.categoria.trim()
    };

    productos.push(nuevoProducto);

    res.status(201).json({
        mensaje: "producto creado correctamente",
        producto: nuevoProducto
    });
});


/* ==========================================
   semana 8 - actualizar un producto
   ========================================== */

// actualiza los datos de un producto existente
app.put("/api/productos/:id", validarProducto, (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "el identificador debe ser un numero entero positivo"
        });
    }

    const indice = productos.findIndex(item => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: "producto no encontrado"
        });
    }

    const productoActualizado = {
        id,
        nombre: req.body.nombre.trim(),
        precio: Number(req.body.precio),
        categoria: req.body.categoria.trim()
    };

    productos[indice] = productoActualizado;

    res.json({
        mensaje: "producto actualizado correctamente",
        producto: productoActualizado
    });
});


/* ==========================================
   semana 8 - eliminar un producto
   ========================================== */

// elimina un producto existente
app.delete("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "el identificador debe ser un numero entero positivo"
        });
    }

    const indice = productos.findIndex(item => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: "producto no encontrado"
        });
    }

    const productoEliminado = productos[indice];

    productos = productos.filter(item => item.id !== id);

    res.json({
        mensaje: "producto eliminado correctamente",
        producto: productoEliminado
    });
});


/* ==========================================
   semana 8 - manejar rutas inexistentes
   ========================================== */

// responde cuando se solicita una ruta que no existe
app.use((req, res) => {
    res.status(404).json({
        error: "ruta no encontrada"
    });
});


/* ==========================================
   semana 7 y 8 - iniciar el servidor
   ========================================== */

// escucha solicitudes en el puerto configurado
app.listen(PUERTO, () => {
    console.log(`servidor disponible en http://localhost:${PUERTO}`);
});
