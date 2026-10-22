
/* semana 12 - conectar la interfaz con la api */

const API_URL = "http://localhost:3000/api/productos";

const listaProductos = document.getElementById("lista-productos");
const cantidadProductos = document.getElementById("cantidad-productos");
const valorCatalogo = document.getElementById("valor-catalogo");
const formulario = document.getElementById("formulario-producto");
const mensaje = document.getElementById("mensaje");
const botonGuardar = document.getElementById("boton-guardar");
const botonRecargar = document.getElementById("boton-recargar");

const formatoMoneda = new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 2
});

/* semana 12 - mostrar mensajes */

function mostrarMensaje(texto, tipo = "") {
    mensaje.textContent = texto;
    mensaje.className = tipo;
}

/* semana 12 - crear tarjetas de productos */

function mostrarProductos(productos) {
    listaProductos.replaceChildren();

    cantidadProductos.textContent = productos.length;

    const total = productos.reduce(
        (suma, producto) => suma + producto.precio,
        0
    );

    valorCatalogo.textContent = formatoMoneda.format(total);

    if (productos.length === 0) {
        const texto = document.createElement("p");
        texto.textContent = "No hay productos registrados";
        listaProductos.appendChild(texto);
        return;
    }

    productos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const categoria = document.createElement("p");
        categoria.textContent = `Categoria: ${producto.categoria}`;

        const precio = document.createElement("p");
        precio.className = "precio";
        precio.textContent = formatoMoneda.format(producto.precio);

        const id = document.createElement("p");
        id.className = "id-producto";
        id.textContent = `ID: ${producto.id}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "boton-eliminar";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            eliminarProducto(producto.id, botonEliminar);
        });

        tarjeta.append(nombre, categoria, precio, id, botonEliminar);
        listaProductos.appendChild(tarjeta);
    });
}

/* semana 12 - consultar productos desde el servidor */

async function cargarProductos() {
    listaProductos.replaceChildren();

    const cargando = document.createElement("p");
    cargando.textContent = "Cargando productos...";
    listaProductos.appendChild(cargando);

    botonRecargar.disabled = true;

    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("no se pudieron consultar los productos");
        }

        const productos = await respuesta.json();

        mostrarProductos(productos);
        mostrarMensaje("");
    } catch (error) {
        listaProductos.replaceChildren();

        const textoError = document.createElement("p");
        textoError.textContent = "No fue posible cargar el catalogo";
        listaProductos.appendChild(textoError);

        mostrarMensaje(
            "Revisá que el servidor esté encendido y conectado a MongoDB",
            "error"
        );

        console.error("error al cargar productos:", error.message);
    } finally {
        botonRecargar.disabled = false;
    }
}

/* semana 12 - agregar productos */

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const producto = {
        nombre: document.getElementById("nombre").value.trim(),
        precio: Number(document.getElementById("precio").value),
        categoria: document.getElementById("categoria").value.trim()
    };

    if (
        producto.nombre.length < 2 ||
        producto.categoria.length < 2 ||
        !Number.isFinite(producto.precio) ||
        producto.precio <= 0
    ) {
        mostrarMensaje("Revisá los datos ingresados", "error");
        return;
    }

    botonGuardar.disabled = true;
    mostrarMensaje("Guardando producto...");

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            const detalle = Array.isArray(resultado.detalles)
                ? resultado.detalles.join(", ")
                : resultado.detalles;

            throw new Error(detalle || resultado.error || "no se pudo guardar");
        }

        formulario.reset();
        await cargarProductos();
        mostrarMensaje("Producto guardado correctamente", "exito");
    } catch (error) {
        mostrarMensaje(error.message, "error");
        console.error("error al guardar producto:", error.message);
    } finally {
        botonGuardar.disabled = false;
    }
});

/* semana 12 - eliminar productos */

async function eliminarProducto(id, boton) {
    if (!window.confirm("Deseas eliminar este producto?")) {
        return;
    }

    boton.disabled = true;
    mostrarMensaje("Eliminando producto...");

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.error || "no se pudo eliminar el producto");
        }

        await cargarProductos();
        mostrarMensaje("Producto eliminado correctamente", "exito");
    } catch (error) {
        mostrarMensaje(error.message, "error");
        console.error("error al eliminar producto:", error.message);
    } finally {
        boton.disabled = false;
    }
}

/* semana 12 - actualizar el catalogo manualmente */

botonRecargar.addEventListener("click", cargarProductos);

/* semana 12 - cargar productos al abrir la pagina */

cargarProductos();
