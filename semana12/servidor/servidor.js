
/* semana 12 - servidor para integrar la interfaz con la api */

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Producto = require("./modelos/Producto");

const app = express();
const PUERTO = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const NOMBRE_BD = process.env.MONGODB_DB || "tiendaWeb";

app.use(cors());
app.use(express.json());

/* semana 12 - registrar solicitudes */

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

/* semana 12 - validar identificadores */

function obtenerId(valor) {
    const id = Number(valor);

    if (!Number.isSafeInteger(id) || id < 1) {
        return null;
    }

    return id;
}

/* semana 12 - validar datos */

function validarProducto(datos) {
    const errores = [];

    if (typeof datos.nombre !== "string" || datos.nombre.trim().length < 2) {
        errores.push("el nombre debe tener al menos 2 caracteres");
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
        datos.categoria.trim().length < 2
    ) {
        errores.push("la categoria debe tener al menos 2 caracteres");
    }

    return errores;
}

/* semana 12 - ruta principal */

app.get("/", (req, res) => {
    res.json({
        mensaje: "servidor funcionando correctamente",
        semana: 12
    });
});

/* semana 12 - consultar estado */

app.get("/api/estado", (req, res) => {
    res.json({
        servidor: "activo",
        baseDatos: mongoose.connection.readyState === 1
            ? "conectada"
            : "desconectada",
        nombreBaseDatos: NOMBRE_BD
    });
});

/* semana 12 - consultar todos los productos */

app.get("/api/productos", async (req, res, next) => {
    try {
        const productos = await Producto.find().sort({ id: 1 });
        res.json(productos);
    } catch (error) {
        next(error);
    }
});

/* semana 12 - consultar un producto */

app.get("/api/productos/:id", async (req, res, next) => {
    try {
        const id = obtenerId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                error: "el identificador no es valido"
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

/* semana 12 - agregar un producto */

app.post("/api/productos", async (req, res, next) => {
    try {
        const errores = validarProducto(req.body);

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

        await producto.save();

        res.status(201).json(producto);
    } catch (error) {
        next(error);
    }
});

/* semana 12 - actualizar un producto */

app.put("/api/productos/:id", async (req, res, next) => {
    try {
        const id = obtenerId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                error: "el identificador no es valido"
            });
        }

        const errores = validarProducto(req.body);

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

        await producto.save();

        res.json(producto);
    } catch (error) {
        next(error);
    }
});

/* semana 12 - eliminar un producto */

app.delete("/api/productos/:id", async (req, res, next) => {
    try {
        const id = obtenerId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                error: "el identificador no es valido"
            });
        }

        const producto = await Producto.findOneAndDelete({ id });

        if (!producto) {
            return res.status(404).json({
                error: "producto no encontrado"
            });
        }

        res.json({
            mensaje: "producto eliminado correctamente",
            producto
        });
    } catch (error) {
        next(error);
    }
});

/* semana 12 - controlar rutas inexistentes */

app.use((req, res) => {
    res.status(404).json({
        error: "ruta no encontrada"
    });
});

/* semana 12 - manejar errores */

app.use((error, req, res, next) => {
    console.error("error:", error.message);

    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({
            error: "el json enviado no es valido"
        });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
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

/* semana 12 - iniciar despues de conectar la base de datos */

async function iniciarServidor() {
    try {
        await mongoose.connect(URI, {
            dbName: NOMBRE_BD,
            serverSelectionTimeoutMS: 5000
        });

        await Producto.init();

        app.listen(PUERTO, () => {
            console.log(`servidor disponible en http://localhost:${PUERTO}`);
            console.log(`base de datos conectada: ${NOMBRE_BD}`);
        });
    } catch (error) {
        console.error("no se pudo iniciar el servidor:", error.message);
        process.exit(1);
    }
}

iniciarServidor();
