
/* semana 10 - mongoose y consultas */

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Producto = require("./modelos/producto");

const app = express();
const PUERTO = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const NOMBRE_BD = process.env.MONGODB_DB || "tiendaWeb";

app.use(express.json());

/* semana 10 - consultar estado de la base de datos */

app.get("/", (req, res) => {
    res.json({
        mensaje: "servidor de la tienda funcionando",
        semana: 10
    });
});

app.get("/api/estado", (req, res) => {
    res.json({
        baseDatos: NOMBRE_BD,
        estado: mongoose.connection.readyState === 1
            ? "conectado"
            : "desconectado"
    });
});

/* semana 10 - consultar todos los productos */

app.get("/api/productos", async (req, res, next) => {
    try {
        const productos = await Producto.find().sort({ id: 1 });
        res.json(productos);
    } catch (error) {
        next(error);
    }
});

/* semana 10 - consultar un producto por id */

app.get("/api/productos/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.status(400).json({
                error: "id no valido"
            });
        }

        const producto = await Producto.findOne({ id });

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

/* semana 10 - agregar un producto */

app.post("/api/productos", async (req, res, next) => {
    try {
        const ultimo = await Producto.findOne().sort({ id: -1 });
        const nuevoId = ultimo ? ultimo.id + 1 : 1;

        const producto = new Producto({
            id: nuevoId,
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria
        });

        const productoGuardado = await producto.save();

        res.status(201).json(productoGuardado);
    } catch (error) {
        next(error);
    }
});

/* semana 10 - actualizar un producto */

app.put("/api/productos/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.status(400).json({
                error: "id no valido"
            });
        }

        const producto = await Producto.findOne({ id });

        if (!producto) {
            return res.status(404).json({
                error: "producto no encontrado"
            });
        }

        producto.nombre = req.body.nombre;
        producto.precio = req.body.precio;
        producto.categoria = req.body.categoria;

        const actualizado = await producto.save();

        res.json(actualizado);
    } catch (error) {
        next(error);
    }
});

/* semana 10 - eliminar un producto */

app.delete("/api/productos/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.status(400).json({
                error: "id no valido"
            });
        }

        const producto = await Producto.findOneAndDelete({ id });

        if (!producto) {
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

/* semana 10 - manejar rutas inexistentes */

app.use((req, res) => {
    res.status(404).json({
        error: "ruta no encontrada"
    });
});

/* semana 10 - manejar errores de validacion y consultas */

app.use((error, req, res, next) => {
    console.error("error en el servidor:", error.message);

    if (
        error.name === "ValidationError" ||
        error.name === "CastError"
    ) {
        return res.status(400).json({
            error: "datos invalidos",
            detalles: error.message
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            error: "ya existe un producto con ese identificador"
        });
    }

    res.status(500).json({
        error: "error interno del servidor"
    });
});

/* semana 10 - conectar mongoose e iniciar el servidor */

async function iniciarServidor() {
    try {
        await mongoose.connect(URI, {
            dbName: NOMBRE_BD
        });

        await Producto.init();

        console.log("conexion con mongoose correcta");
        console.log("base de datos:", NOMBRE_BD);

        app.listen(PUERTO, () => {
            console.log(
                `servidor disponible en http://localhost:${PUERTO}`
            );
        });
    } catch (error) {
        console.error("no se pudo iniciar el servidor:", error.message);
        process.exitCode = 1;
    }
}

iniciarServidor();
