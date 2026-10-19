
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


// muestra los productos disponibles en el catalogo
const mostrarProductos = (lista) => {
    const contenedor = document.getElementById("lista-productos");

    contenedor.innerHTML = lista.map(producto => `
        <article class="producto">
            <h3>${producto.nombre}</h3>
            <p class="categoria">categoria: ${producto.categoria}</p>
            <p class="precio">₡${producto.precio.toLocaleString("es-CR")}</p>
        </article>
    `).join("");
};



// calcula la cantidad de productos y el valor total del catalogo
const mostrarResumen = () => {
    const cantidad = productos.length;

    const valorTotal = productos.reduce(
        (total, producto) => total + producto.precio,
        0
    );

    document.getElementById("cantidad-productos").textContent =
        `cantidad de productos: ${cantidad}`;

    document.getElementById("valor-catalogo").textContent =
        `valor total del catalogo: ₡${valorTotal.toLocaleString("es-CR")}`;
};


// ejecuta las funciones para mostrar los productos y el resumen al cargar la pagina
mostrarProductos(productos);
mostrarResumen();

