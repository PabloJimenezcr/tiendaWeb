
/* ==========================================
   semana 1 - fundamentos de es6
   ========================================== */

// define la lista inicial de productos de ejemplo
const productos = [
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
   semana 2 - parametros por defecto
   ========================================== */

// calcula el precio final con un descuento configurable
const calcularDescuento = (precio, descuento = 10) => {
    return precio - (precio * descuento / 100);
};


/* ==========================================
   semana 2 - operador spread
   ========================================== */

// copia el primer producto y modifica sus datos
const productoOferta = {
    ...productos[0],
    id: 5,
    nombre: "teclado mecanico en oferta",
    precio: 22000
};

// crea una nueva lista con todos los productos y la oferta
const productosActualizados = [
    ...productos,
    productoOferta
];


/* ==========================================
   semana 2 - desestructuracion de objetos
   ========================================== */

// extrae las propiedades principales del producto en oferta
const {
    nombre: nombreOferta,
    precio: precioOferta,
    categoria: categoriaOferta
} = productoOferta;

// muestra los datos extraidos en la consola
console.log("producto en oferta");
console.log(nombreOferta);
console.log(precioOferta);
console.log(categoriaOferta);


/* ==========================================
   semana 2 - desestructuracion de arreglos
   ========================================== */

// extrae los dos primeros productos de la lista original
const [primerProducto, segundoProducto] = productos;

// muestra los nombres de los productos seleccionados
console.log("primer producto:", primerProducto.nombre);
console.log("segundo producto:", segundoProducto.nombre);


/* ==========================================
   semana 2 - operador rest
   ========================================== */

// suma una cantidad variable de precios
const sumarPrecios = (...precios) => {
    return precios.reduce((total, precio) => total + precio, 0);
};

// prueba la suma de varios precios
console.log("suma de precios:", sumarPrecios(25000, 12000, 18000));


/* ==========================================
   semana 3 - buenas practicas
   ========================================== */

// reutiliza el formato de moneda en diferentes partes de la aplicacion
const formatearPrecio = (precio) => {
    return `₡${precio.toLocaleString("es-CR")}`;
};


/* ==========================================
   semana 3 - uso de symbol
   ========================================== */

// crea una clave unica para identificar un dato interno
const codigoInterno = Symbol("codigoInterno");

// asigna un codigo interno al producto en oferta
productoOferta[codigoInterno] = "INT-001";

// muestra el codigo interno en la consola
console.log("codigo interno:", productoOferta[codigoInterno]);


/* ==========================================
   semana 3 - uso de iteradores
   ========================================== */

// obtiene el iterador de la lista actualizada
const iteradorCatalogo = productosActualizados[Symbol.iterator]();

// obtiene el primer resultado del iterador
let resultadoCatalogo = iteradorCatalogo.next();

// recorre la lista mientras existan productos
while (!resultadoCatalogo.done) {
    console.log("producto recorrido:", resultadoCatalogo.value.nombre);
    resultadoCatalogo = iteradorCatalogo.next();
}


/* ==========================================
   semana 4 - closures y funciones avanzadas
   ========================================== */

// crea un filtro que recuerda la categoria seleccionada
const crearFiltroCategoria = (categoriaSeleccionada) => {
    return (producto) => {
        if (categoriaSeleccionada === "todas") {
            return true;
        }

        return producto.categoria === categoriaSeleccionada;
    };
};


/* ==========================================
   semana 4 - obtener categorias
   ========================================== */

// obtiene las categorias sin repetirlas
const obtenerCategorias = (lista) => {
    return [...new Set(lista.map(producto => producto.categoria))];
};


/* ==========================================
   semana 5 - callbacks
   ========================================== */

// ejecuta una funcion cuando termina una tarea asincrona
const ejecutarConProductos = (callback, lista) => {
    callback(lista);
};


/* ==========================================
   semana 5 - promesas y async await
   ========================================== */

// demuestra el uso de una promesa para esperar una tarea
const esperarRespuesta = (tiempo = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, tiempo);
    });
};


/* ==========================================
   semana 6 - configurar la api externa
   ========================================== */

// define la direccion de la api de productos
const URL_API = "https://dummyjson.com/products?limit=30";


/* ==========================================
   semana 6 - formato de precios externos
   ========================================== */

// muestra los precios externos en dolares estadounidenses
const formatearPrecioUSD = (precio) => {
    return `US$${precio.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
};


/* ==========================================
   semana 6 - consumir la api con fetch
   ========================================== */

// solicita los productos al servidor externo
const obtenerProductos = async () => {
    const respuesta = await fetch(URL_API);

    // verifica si el servidor respondio correctamente
    if (!respuesta.ok) {
        throw new Error(`error http: ${respuesta.status}`);
    }

    // convierte la respuesta a un objeto javascript
    const datos = await respuesta.json();

    // verifica que la respuesta contenga una lista de productos
    if (!Array.isArray(datos.products)) {
        throw new Error("la respuesta no contiene una lista de productos");
    }

    // adapta los campos externos al formato de la tienda
    return datos.products.map(producto => ({
        id: producto.id,
        nombre: producto.title,
        precio: producto.price,
        categoria: producto.category,
        imagen: producto.thumbnail
    }));
};


/* ==========================================
   semana 4 y 6 - cargar categorias
   ========================================== */

// agrega las categorias disponibles al selector
const cargarCategorias = (lista) => {
    const selector = document.getElementById("filtro-categoria");

    if (!selector) {
        console.error("no se encontro el selector de categorias");
        return;
    }

    // conserva solamente la opcion general antes de cargar categorias
    selector.innerHTML = '<option value="todas">Todas las categorias</option>';

    const categorias = obtenerCategorias(lista);

    categorias.forEach(categoria => {
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        selector.appendChild(opcion);
    });
};


/* ==========================================
   semana 1 a 6 - mostrar productos
   ========================================== */

// muestra las tarjetas del catalogo
const mostrarProductos = (lista) => {
    const contenedor = document.getElementById("lista-productos");
    const mensaje = document.getElementById("mensaje-productos");

    if (!contenedor) {
        console.error("no se encontro el contenedor de productos");
        return;
    }

    // genera una tarjeta para cada producto
    contenedor.innerHTML = lista.map(producto => {
        const precioFinal = calcularDescuento(producto.precio);

        return `
            <article class="producto">
                ${
                    producto.imagen
                        ? `<img
                            class="imagen-producto"
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            loading="lazy"
                        >`
                        : ""
                }

                <h3>${producto.nombre}</h3>

                <p class="categoria">
                    categoria: ${producto.categoria}
                </p>

                <p class="precio-original">
                    precio original: ${formatearPrecioUSD(producto.precio)}
                </p>

                <p class="precio-descuento">
                    precio con descuento: ${formatearPrecioUSD(precioFinal)}
                </p>
            </article>
        `;
    }).join("");

    // muestra un mensaje si no hay productos para presentar
    if (mensaje) {
        mensaje.hidden = lista.length > 0;
    }
};


/* ==========================================
   semana 2 y 3 - resumen del catalogo
   ========================================== */

// calcula la cantidad y el valor total de los productos visibles
const mostrarResumen = (lista) => {
    const elementoCantidad = document.getElementById("cantidad-productos");
    const elementoValor = document.getElementById("valor-catalogo");

    const cantidad = lista.length;

    const valorTotal = lista.reduce(
        (total, producto) => total + producto.precio,
        0
    );

    if (elementoCantidad) {
        elementoCantidad.textContent =
            `cantidad de productos: ${cantidad}`;
    }

    if (elementoValor) {
        elementoValor.textContent =
            `valor total del catalogo: ${formatearPrecioUSD(valorTotal)}`;
    }
};


/* ==========================================
   semana 4 y 6 - aplicar el filtro
   ========================================== */

// filtra los productos y actualiza el catalogo
const aplicarFiltro = (lista, categoriaSeleccionada) => {
    const filtro = crearFiltroCategoria(categoriaSeleccionada);
    const productosFiltrados = lista.filter(filtro);

    mostrarProductos(productosFiltrados);
    mostrarResumen(productosFiltrados);
};


/* ==========================================
   semana 5 y 6 - mostrar estados de carga
   ========================================== */

// muestra mensajes de carga o error
const mostrarEstado = (mensaje, tipo = "carga") => {
    let estado = document.getElementById("estado-catalogo");

    if (!estado) {
        estado = document.createElement("p");
        estado.id = "estado-catalogo";

        const seccion = document.querySelector(".filtros");

        if (seccion) {
            seccion.insertAdjacentElement("afterend", estado);
        }
    }

    if (estado) {
        estado.className =
            tipo === "error" ? "estado-error" : "estado-carga";

        estado.textContent = mensaje;
        estado.hidden = mensaje === "";
    }
};


/* ==========================================
   semana 4 a 6 - escuchar cambios del filtro
   ========================================== */

// conserva los productos recibidos desde la api
let catalogoCargado = [];

// conecta el selector con el catalogo
const inicializarFiltro = () => {
    const selector = document.getElementById("filtro-categoria");

    if (!selector) {
        console.error("no se encontro el selector de categorias");
        return;
    }

    selector.addEventListener("change", () => {
        aplicarFiltro(catalogoCargado, selector.value);
    });
};


/* ==========================================
   semana 5 y 6 - iniciar la aplicacion
   ========================================== */

// carga los productos y controla posibles errores
const iniciarAplicacion = async () => {
    mostrarEstado("cargando productos desde la api...");

    try {
        // espera la respuesta del servidor
        catalogoCargado = await obtenerProductos();

        // comprueba que se hayan recibido productos
        if (catalogoCargado.length === 0) {
            mostrarProductos([]);
            mostrarResumen([]);
            cargarCategorias([]);
            mostrarEstado("la api no devolvio productos");
            return;
        }

        // prepara el filtro y presenta el catalogo
        cargarCategorias(catalogoCargado);
        inicializarFiltro();
        aplicarFiltro(catalogoCargado, "todas");

        mostrarEstado("");
    } catch (error) {
        console.error("error al cargar el catalogo:", error);

        mostrarEstado(
            "no fue posible cargar los productos. revise la conexion e intentelo de nuevo",
            "error"
        );
    }
};


/* ==========================================
   semana 1 a 6 - ejecucion de la aplicacion
   ========================================== */

// inicia la carga de datos externos
iniciarAplicacion();
