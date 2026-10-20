
/* ==========================================
   semana 1 - fundamentos de es6
   ========================================== */

// define la lista inicial de productos
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
   semana 4 - preparar categorias del filtro
   ========================================== */

// obtiene las categorias sin repetirlas
const obtenerCategorias = (lista) => {
    return [...new Set(lista.map(producto => producto.categoria))];
};

// agrega las categorias al selector
const cargarCategorias = (lista) => {
    const selector = document.getElementById("filtro-categoria");

    if (!selector) {
        console.error("no se encontro el selector de categorias");
        return;
    }

    const categorias = obtenerCategorias(lista);

    categorias.forEach(categoria => {
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        selector.appendChild(opcion);
    });
};


/* ==========================================
   semana 5 - simular una consulta asincrona
   ========================================== */

// simula la espera de una respuesta de un servidor
const esperarRespuesta = (tiempo = 1500) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, tiempo);
    });
};


/* ==========================================
   semana 5 - cargar productos con promesas
   ========================================== */

// simula la consulta asincrona del catalogo
const obtenerProductos = () => {
    return esperarRespuesta().then(() => {
        return productosActualizados;
    });
};


/* ==========================================
   semana 5 - ejemplo de callback
   ========================================== */

// ejecuta una funcion cuando termina la carga
const ejecutarConProductos = (callback) => {
    obtenerProductos()
        .then((lista) => {
            callback(lista);
        })
        .catch((error) => {
            console.error("error al cargar productos:", error);
        });
};


/* ==========================================
   semana 1 a 5 - mostrar productos
   ========================================== */

// muestra las tarjetas con precios originales y descuentos
const mostrarProductos = (lista) => {
    const contenedor = document.getElementById("lista-productos");
    const mensaje = document.getElementById("mensaje-productos");

    if (!contenedor) {
        console.error("no se encontro el contenedor de productos");
        return;
    }

    contenedor.innerHTML = lista.map(producto => {
        const precioFinal = calcularDescuento(producto.precio);

        return `
            <article class="producto">
                <h3>${producto.nombre}</h3>
                <p class="categoria">categoria: ${producto.categoria}</p>
                <p class="precio-original">
                    precio original: ${formatearPrecio(producto.precio)}
                </p>
                <p class="precio-descuento">
                    precio con descuento: ${formatearPrecio(precioFinal)}
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
        elementoCantidad.textContent = `cantidad de productos: ${cantidad}`;
    }

    if (elementoValor) {
        elementoValor.textContent =
            `valor total del catalogo: ${formatearPrecio(valorTotal)}`;
    }
};


/* ==========================================
   semana 4 - aplicar el filtro dinamico
   ========================================== */

// filtra los productos y actualiza el catalogo y su resumen
const aplicarFiltro = (lista, categoriaSeleccionada) => {
    const filtro = crearFiltroCategoria(categoriaSeleccionada);
    const productosFiltrados = lista.filter(filtro);

    mostrarProductos(productosFiltrados);
    mostrarResumen(productosFiltrados);
};


/* ==========================================
   semana 5 - estados de carga
   ========================================== */

// muestra mensajes mientras se procesa la consulta
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
        estado.className = tipo === "error" ? "estado-error" : "estado-carga";
        estado.textContent = mensaje;
        estado.hidden = mensaje === "";
    }
};


/* ==========================================
   semana 4 y 5 - escuchar cambios en el filtro
   ========================================== */

// conserva la lista cargada para filtrar sin repetir la consulta
let catalogoCargado = [];

// actualiza los productos al cambiar la categoria
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
   semana 5 - iniciar la aplicacion con async await
   ========================================== */

// carga el catalogo y controla posibles errores
const iniciarAplicacion = async () => {
    mostrarEstado("cargando productos...");

    try {
        // espera la respuesta antes de mostrar el catalogo
        catalogoCargado = await obtenerProductos();

        cargarCategorias(catalogoCargado);
        inicializarFiltro();

        aplicarFiltro(catalogoCargado, "todas");
        mostrarEstado("");
    } catch (error) {
        console.error("error al iniciar la aplicacion:", error);
        mostrarEstado("no fue posible cargar los productos", "error");
    }
};


/* ==========================================
   semana 1 a 5 - ejecucion de la aplicacion
   ========================================== */

// inicia la carga asincrona del catalogo
iniciarAplicacion();
