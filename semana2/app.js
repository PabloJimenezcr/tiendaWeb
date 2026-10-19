
/* ==========================================
   SEMANA 1 - FUNDAMENTOS DE ES6
   ========================================== */

// lista inicial de productos
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
   SEMANA 2 - PARAMETROS POR DEFECTO
   ========================================== */

// calcula el precio con un descuento configurable
const calcularDescuento = (precio, descuento = 10) => {
    return precio - (precio * descuento / 100);
};


/* ==========================================
   SEMANA 2 - OPERADOR SPREAD
   ========================================== */

// crea una copia del producto y modifica algunos valores
const productoOferta = {
    ...productos[0],
    nombre: "teclado mecanico en oferta",
    precio: 22000
};

// crea una nueva lista que incluye el producto en oferta
const productosActualizados = [
    ...productos,
    productoOferta
];


/* ==========================================
   SEMANA 2 - DESESTRUCTURACION DE OBJETOS
   ========================================== */

// extrae las propiedades principales del producto en oferta
const {
    nombre: nombreOferta,
    precio: precioOferta,
    categoria: categoriaOferta
} = productoOferta;

// muestra los datos extraidos del producto en oferta
console.log("producto en oferta");
console.log(nombreOferta);
console.log(precioOferta);
console.log(categoriaOferta);


/* ==========================================
   SEMANA 2 - DESESTRUCTURACION DE ARREGLOS
   ========================================== */

// extrae los dos primeros productos de la lista original
const [primerProducto, segundoProducto] = productos;

// muestra los nombres de los productos seleccionados
console.log("primer producto:", primerProducto.nombre);
console.log("segundo producto:", segundoProducto.nombre);


/* ==========================================
   SEMANA 2 - OPERADOR REST
   ========================================== */

// suma una cantidad variable de precios
const sumarPrecios = (...precios) => {
    return precios.reduce((total, precio) => total + precio, 0);
};

// prueba la suma de varios precios
console.log("suma de precios:", sumarPrecios(25000, 12000, 18000));


/* ==========================================
   SEMANA 1 Y 2 - MOSTRAR PRODUCTOS
   ========================================== */

// muestra los productos con sus precios y descuentos
const mostrarProductos = (lista) => {
    const contenedor = document.getElementById("lista-productos");

    contenedor.innerHTML = lista.map(producto => {
        const precioFinal = calcularDescuento(producto.precio);

        return `
            <article class="producto">
                <h3>${producto.nombre}</h3>
                <p class="categoria">categoria: ${producto.categoria}</p>
                
                <p class="precio-original">
                precio original: ₡${producto.precio.toLocaleString("es-CR")}
                </p>
<p class="precio-descuento">
    precio con descuento: ₡${precioFinal.toLocaleString("es-CR")}
</p>

            </article>
        `;
    }).join("");
};


/* ==========================================
   SEMANA 2 - RESUMEN DEL CATALOGO
   ========================================== */

// calcula la cantidad y el valor total de una lista de productos
const mostrarResumen = (lista) => {
    const cantidad = lista.length;

    const valorTotal = lista.reduce(
        (total, producto) => total + producto.precio,
        0
    );

    document.getElementById("cantidad-productos").textContent =
        `cantidad de productos: ${cantidad}`;

    document.getElementById("valor-catalogo").textContent =
        `valor total del catalogo: ₡${valorTotal.toLocaleString("es-CR")}`;
};


/* ==========================================
   EJECUCION DE LA APLICACION
   ========================================== */

// muestra el catalogo actualizado y su resumen
mostrarProductos(productosActualizados);
mostrarResumen(productosActualizados);
