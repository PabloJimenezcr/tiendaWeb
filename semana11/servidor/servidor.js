
/* semana 11 - manejo de errores y depuracion */

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Producto = require("./modelos/Producto");

const app = express();
const PUERTO = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const NOMBRE_BD = process.env.MONGODB_DB || "tiendaWeb";

/* semana 11 - middleware para procesar solicitudes */

app.use(express.json());

/* semana 11 - registrar solicitudes */

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

/* semana 11 - validar datos de productos */

function validarDatosProducto(datos) {
    const errores = [];

    if (typeof datos.nombre !== "string" || !datos.nombre.trim()) {
        errores.push("el nombre es obligatorio");
    }

    if (
        typeof datos.precio !== "number" ||
        !Number.isFinite(datos.precio) ||
        datos.precio <= 0
    ) {
        errores.push("el precio debe ser un numero mayor que cero");
    }

    if (
        typeof datos.categoria !== "string" ||
        !datos.categoria.trim()
    ) {
        errores.push("la categoria es obligatoria");
    }

    return errores;
}

/* semana 11 - validar identificadores */

function obtenerId(valor) {
    const id = Number(valor);

    if (!Number.isSafeInteger(id) || id < 1) {
        return null;
    }

    return id;
}

/* semana 11 - ruta principal */

app.get("/", (req, res) => {
    res.json({
        mensaje: "servidor funcionando correctamente",
        semana: 11
    });
});

/* semana 11 - estado de la conexion */

app.get("/api/estado", (req, res) => {
    res.json({
        baseDatos: NOMBRE_BD,
        estado: mongoose.connection.readyState === 1
            ? "conectado"
            : "desconectado"
    });
});

/* semana 11 - consultar productos */

app.get("/api/productos", async (req, res, next) => {
    try {
        const productos = await Producto.find().sort({ id: 1 });
        res.json(productos);
    } catch (error) {
        next(error);
    }
});

/* semana 11 - consultar un producto */

app.get("/api/productos/:id", async (req, res, next) => {
    try {
        const id = obtenerId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                error: "el identificador debe ser un numero entero positivo"
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

/* semana 11 - crear un producto */

app.post("/api/productos", async (req, res, next) => {
    try {
        const errores = validarDatosProducto(req.body);

        if (errores.length > 0) {
            return res.status(400).json({
                error: "datos invalidos",
                detalles: errores
            });
        }

        const ultimo = await Producto.findOne().sort({ id: -1 });
        const nuevoId = ultimo ? ultimo.id + 1 : 1;

        const producto = new Producto({
            id: nuevoId,
            nombre: req.body.nombre.trim(),
            precio: req.body.precio,
            categoria: req.body.categoria.trim()
        });

        const guardado = await producto.save();

        res.status(201).json(guardado);
    } catch (error) {
        next(error);
    }
});

/* semana 11 - actualizar un producto */

app.put("/api/productos/:id", async (req, res, next) => {
    try {
        const id = obtenerId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                error: "el identificador debe ser un numero entero positivo"
            });
        }

        const errores = validarDatosProducto(req.body);

        if (errores.length > 0) {
            return res.status(400).json({
                error: "datos invalidos",
                detalles: errores
            });
        }

        const producto = await Producto.findOne({ id });

        if (!producto) {
            return res.status(404).json({
                error: "producto no encontrado"
            });
        }

        producto.nombre = req.body.nombre.trim();
        producto.precio = req.body.precio;
        producto.categoria = req.body.categoria.trim();

        const actualizado = await producto.save();

        res.json(actualizado);
    } catch (error) {
        next(error);
    }
});

/* semana 11 - eliminar un producto */

app.delete("/api/productos/:id", async (req, res, next) => {
    try {
        const id = obtenerId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                error: "el identificador debe ser un numero entero positivo"
            });
        }

        const eliminado = await Producto.findOneAndDelete({ id });

        if (!eliminado) {
            return res.status(404).json({
                error: "producto no encontrado"
            });
        }

        res.json({
            mensaje: "producto eliminado correctamente",
            id
        });
    } catch (error) {
        next(error);
    }
});

/* semana 11 - manejar rutas inexistentes */

app.use((req, res) => {
    res.status(404).json({
        error: "ruta no encontrada"
    });
});

/* semana 11 - manejar errores de solicitudes y base de datos */

app.use((error, req, res, next) => {
    console.error("error detectado:", error.message);

    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({
            error: "el cuerpo de la solicitud contiene json invalido"
        });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
        return res.status(400).json({
            error: "los datos no cumplen las validaciones",
            detalles: error.message
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            error: "el producto ya existe"
        });
    }

    res.status(500).json({
        error: "ocurrio un error interno del servidor"
    });
});

/* semana 11 - iniciar el servidor */

async function iniciarServidor() {
    try {
        await mongoose.connect(URI, {
            dbName: NOMBRE_BD,
            serverSelectionTimeoutMS: 5000
        });

        await Producto.init();

        console.log("conexion con mongodb correcta");
        console.log("base de datos:", NOMBRE_BD);

        app.listen(PUERTO, () => {
            console.log(`servidor disponible en http://localhost:${PUERTO}`);
        });
    } catch (error) {
        console.error("error al iniciar:", error.message);
        process.exitCode = 1;
    }
}

iniciarServidor();
