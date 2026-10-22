
/* ==========================================
   semana 7 - importar express
   ========================================== */

// carga la libreria express
const express = require("express");


/* ==========================================
   semana 7 - configurar el servidor
   ========================================== */

// crea la aplicacion del servidor
const app = express();

// define el puerto del servidor
const PUERTO = 3000;


/* ==========================================
   semana 7 - middleware basico
   ========================================== */

// permite recibir datos en formato json
app.use(express.json());


/* ==========================================
   semana 7 - ruta principal
   ========================================== */

// responde a las solicitudes de la ruta principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "servidor de tienda web funcionando",
        semana: 7
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
   semana 7 - iniciar el servidor
   ========================================== */

// inicia el servidor en el puerto configurado
app.listen(PUERTO, () => {
    console.log(`servidor disponible en http://localhost:${PUERTO}`);
});
