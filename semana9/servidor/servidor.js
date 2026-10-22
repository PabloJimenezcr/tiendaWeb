
/* semana 9 - mongodb y persistencia de datos */

require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PUERTO = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;
const NOMBRE_BD = process.env.MONGODB_DB || "tiendaWeb";

const cliente = new MongoClient(URI || "mongodb://127.0.0.1:27017");

let coleccionProductos;

app.use(express.json());

/* semana 8 - validacion de productos */

function validarProducto(datos) {
    const nombreValido =
        typeof datos.nombre === "string" &&
        datos.nombre.trim().length > 0;

    const categoriaValida =
        typeof datos.categoria === "string" &&
        datos.categoria.trim().length > 0;

    const precioValido =
        typeof datos.precio === "number" &&
        Number.isFinite(datos.precio) &&
        datos.precio > 0;

    return nombreValido && categoriaValida && precioValido;
}

/* semana 9 - consultar estado de la base de datos */

app.get("/", (req, res) => {
    res.json({
        mensaje: "servidor de la tienda funcionando",
        semana: 9
    });
});

app.get("/api/estado", async (req, res, next) => {
    try {
        await cliente.db(NOMBRE_BD).command({ ping: 1 });

        res.json({
            servidor: "conectado",
            baseDatos: NOMBRE_BD,
            estado: "correcto"
        });
    } catch (error) {
        next(error);
    }
});

/* semana 8 y 9 - consultar todos los productos */

app.get("/api/productos", async (req, res, next) => {
    try {
        const productos = await coleccionProductos
            .find({})
            .sort({ id: 1 })
            .toArray();

        res.json(productos);
    } catch (error) {
        next(error);
    }
});

/* semana 8 y 9 - consultar un producto */

app.get("/api/productos/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.status(400).json({
                error: "id no valido"
            });
        }

        const producto = await coleccionProductos.findOne({ id });

        if (!producto) {
            return res.status(404).json({
                error: "producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        next(error);
    }
});

/* semana 8 y 9 - agregar un producto */

app.post("/api/productos", async (req, res, next) => {
    try {
        if (!validarProducto(req.body)) {
            return res.status(400).json({
                error: "nombre, categoria y precio valido son obligatorios"
            });
        }

        const ultimoProducto = await coleccionProductos
            .find({})
            .sort({ id: -1 })
            .limit(1)
            .toArray();

        const nuevoId = ultimoProducto.length > 0
            ? ultimoProducto[0].id + 1
            : 1;

        const nuevoProducto = {
            id: nuevoId,
            nombre: req.body.nombre.trim(),
            precio: req.body.precio,
            categoria: req.body.categoria.trim()
        };

        await coleccionProductos.insertOne(nuevoProducto);

        res.status(201).json(nuevoProducto);
    } catch (error) {
        next(error);
    }
});

/* semana 8 y 9 - actualizar un producto */

app.put("/api/productos/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.status(400).json({
                error: "id no valido"
            });
        }

        if (!validarProducto(req.body)) {
            return res.status(400).json({
                error: "nombre, categoria y precio valido son obligatorios"
            });
        }

        const productoActualizado = {
            nombre: req.body.nombre.trim(),
            precio: req.body.precio,
            categoria: req.body.categoria.trim()
        };

        const resultado = await coleccionProductos.updateOne(
            { id },
            { $set: productoActualizado }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                error: "producto no encontrado"
            });
        }

        res.json({
            id,
            ...productoActualizado
        });
    } catch (error) {
        next(error);
    }
});

/* semana 8 y 9 - eliminar un producto */

app.delete("/api/productos/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.status(400).json({
                error: "id no valido"
            });
        }

        const resultado = await coleccionProductos.deleteOne({ id });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                error: "producto no encontrado"
            });
        }

        res.json({
            mensaje: "producto eliminado",
            id
        });
    } catch (error) {
        next(error);
    }
});

/* semana 9 - manejar rutas inexistentes */

app.use((req, res) => {
    res.status(404).json({
        error: "ruta no encontrada"
    });
});

/* semana 9 - manejar errores del servidor */

app.use((error, req, res, next) => {
    console.error("error en el servidor:", error.message);

    res.status(500).json({
        error: "error interno del servidor"
    });
});

/* semana 9 - conectar la base de datos e iniciar el servidor */

async function iniciarServidor() {
    try {
        await cliente.connect();

        const baseDatos = cliente.db(NOMBRE_BD);
        coleccionProductos = baseDatos.collection("productos");

        await coleccionProductos.createIndex(
            { id: 1 },
            { unique: true }
        );

        console.log("conexion con mongodb correcta");
        console.log("base de datos:", NOMBRE_BD);

        app.listen(PUERTO, () => {
            console.log(`servidor disponible en http://localhost:${PUERTO}`);
        });
    } catch (error) {
        console.error("no se pudo iniciar el servidor:", error.message);
        await cliente.close().catch(() => {});
        process.exitCode = 1;
    }
}

iniciarServidor();
