
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
   semana 1 a 3 - mostrar productos
   ========================================== */

// muestra las tarjetas con precios originales y descuentos
const mostrarProductos = (lista) => {
    const contenedor = document.getElementById("lista-productos");

    // verifica que exista el contenedor en el html
    if (!contenedor) {
        console.error("no se encontro el contenedor de productos");
        return;
    }

    // genera una tarjeta para cada producto
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
};


/* ==========================================
   semana 2 y 3 - resumen del catalogo
   ========================================== */

// calcula la cantidad y el valor total de los productos
const mostrarResumen = (lista) => {
    const elementoCantidad = document.getElementById("cantidad-productos");
    const elementoValor = document.getElementById("valor-catalogo");

    // calcula la cantidad de productos
    const cantidad = lista.length;

    // suma los precios originales de todos los productos
    const valorTotal = lista.reduce(
        (total, producto) => total + producto.precio,
        0
    );

    // actualiza el resumen si existen los elementos en el html
    if (elementoCantidad) {
        elementoCantidad.textContent = `cantidad de productos: ${cantidad}`;
    }

    if (elementoValor) {
        elementoValor.textContent =
            `valor total del catalogo: ${formatearPrecio(valorTotal)}`;
    }
};


/* ==========================================
   semana 1 a 3 - ejecucion de la aplicacion
   ========================================== */

// muestra el catalogo actualizado y su resumen
mostrarProductos(productosActualizados);
mostrarResumen(productosActualizados);
