

--------- Semana 1 - fundamentos de ES6: primeros pasos con una tienda web --------- 

Objetivo de la práctica
Crear un catálogo básico de productos para una tienda de tecnología, utilizando JavaScript moderno para almacenar productos, mostrar información y realizar cálculos sencillos.
Al terminar, cada estudiante tendrá:

- Una página web sencilla
- Una lista de productos almacenada en JavaScript
- Funciones para mostrar productos y calcular precios
- Una estructura inicial que podrá reutilizar en las siguientes prácticas


Reto para estudiantes: ampliar el catalogo

El objetivo es demostrar que se comprende el funcionamiento del arreglo, los objetos, las funciones y los métodos utilizados.

- agregar dos productos nuevos con identificadores diferentes
- incorporar una categoria que no exista en la lista original
- crear una funcion flecha que calcule el precio con un 10 por ciento de descuento
- mostrar el precio original y el precio con descuento de cada producto
- verificar que el resumen incluya los seis productos y que el total sea correcto

------ Semana 2 - operadores rest y spread, parámetros por defecto y desestructuración  ------

Objetivo: aprender a extraer información de los productos, copiar y modificar datos sin alterar innecesariamente los originales, y crear funciones más flexibles
Al finalizar, la tienda permitirá:

- Mostrar los productos con sus precios
- Aplicar descuentos configurables
- Crear nuevos productos a partir de otros existentes
- Extraer información específica de un producto
- Calcular resúmenes utilizando parámetros variables

--------- Semana 3 — iteradores, símbolos y buenas prácticas de ES6  --------- 

¿Qué es un iterador?
Un iterador es un mecanismo que permite recorrer una colección de datos y obtener sus elementos uno por uno. En JavaScript, los arreglos tienen un iterador incorporado.

Un iterador utiliza el método next(), que devuelve un objeto con dos propiedades importantes:
- value: el valor del elemento actual
- done: indica si el recorrido ya terminó



--------- Semana 4 - closures y funciones avanzadas  --------- 

La idea será incorporar una funcionalidad dinámica al catálogo utilizando closures, es decir, funciones que pueden recordar y conservar variables de su ámbito externo

Propongo agregar un filtro de productos por categoría que permita seleccionar qué productos mostrar, manteniendo el resumen del catálogo coherente con los resultados visibles

--------- Semana 5 - callbacks, promesas y async/await  --------- 

La idea es simular una consulta que tarda en responder, como ocurriría al solicitar los productos a un servidor. Todavía no usaremos fetch ni una API externa

--------- Semana 6 - Fetch y consumo de APIs  --------- 

Esta semana conectaremos la tienda web con una fuente de datos externa para que el catálogo deje de depender únicamente de los productos escritos manualmente en app.js

API USADA DE PRODUCTOS: https://dummyjson.com/docs/products

Archivos modificados: JS - CSS

--------- Semana 7 - Node.js, npm y Express  --------- 

preparar un servidor local que podamos conectar con el catálogo y ampliar en la semana 8 para gestionar productos mediante rutas y operaciones CRUD

1- se ha creado una carpeta llamada servidor dentro de la carpeta principal de la tienda

2- Se descarga nodejs: https://nodejs.org/en/download y despues se ejecutan estos comandos en terminal:

node -v
npm -v

Si ambos muestran la version, la instalacion fue correcta

3-  Crear el proyecto con npm, se tiene que abrir la terminal dentro de la carpeta tienda-web/servidor
y se ejecuta estos comandos:

npm init -y
npm install express

Esto crea package.json e instala Express como dependencia

4- Crear servidor/server.js
5- Desde la carpeta servidor se tiene que ejecutar con el comando: 

npm start

La terminal debe mostrar: servidor disponible en http://localhost:3000


6- se debe comprobar que funcione, ingresando a estas direcciones:

http://localhost:3000
Se debe recibir un JSON con el mensaje de que el servidor funciona

http://localhost:3000/api/estado
se debera recibir un JSON indicando que la API está activa


--------- Semana 8 - rutas, middleware y CRUD  --------- 

En esta semana vamos a ampliar el servidor de la tienda para que pueda gestionar productos mediante una API propia

1- se actualiza el archivo, servidor.js
2- se ejecuta el servidor: npm start , Si aparece que el puerto ya está en uso, hay que parar la instancia anterior con Ctrl + C y volver a ejecutar el comando

se debera ver: servidor disponible en http://localhost:3000

3- Hay que abrir estas direcciones:

GET
Todos los productos: localhost:3000/api/productos
Debe devolver los cuatro productos iniciales en JSON

GET
Un producto
localhost:3000/api/productos/1
Debe devolver los datos del teclado mecánico

GET
Servidor activo
localhost:3000/api/estado
Debe confirmar que la API está disponible

4- hay que probar crear, actualizar y eliminar con Postman
Para los métodos POST, PUT y DELETE, se puede usar Postman
Descargar la aplicación desde (https://www.postman.com/downloads/)


Crear un producto — POST
URL
http://localhost:3000/api/productos

En Postman seleccione  Body → raw → JSON y se envia:


{
  "nombre": "camara web",
  "precio": 15000,
  "categoria": "accesorios"
}
  
Debe decir 201 created

Actualizar un producto — PUT
Usar la ruta del identificador que se quiere, por ejemplo:

http://localhost:3000/api/productos/1

enviar este JSON:


{
  "nombre": "teclado mecanico rgb",
  "precio": 30000,
  "categoria": "accesorios"
}

La respuesta debe confirmar que el producto se actualizó

Eliminar un producto — DELETE
Seleccionar el método DELETE y usar:

http://localhost:3000/api/productos/1

La respuesta debe confirmar que se eliminó el producto. Después, se consulta  de nuevo GET /api/productos para verificar que ya no aparece: http://localhost:3000/api/productos/



--------- Semana 9 -  MongoDB y persistencia de datos --------- 

Vamos a usar MongoDB Atlas, que permite crear una base de datos en la nube, y el paquete mongodb para conectarnos desde Node.js. En la semana 10 trabajaremos con Mongoose y sus modelos y validaciones


1- Crear la base de datos en MongoDB GRATUITA
Si todavía no se tiene  una base de datos creada, seguir estos pasos:

- Descargar: https://www.mongodb.com/try/download/community
Seleccioná estas opciones:
- Version: la versión estable que aparezca seleccionada
- Platform: Windows
- Package: MSI

 presionar Download
Abrir el archivo .msi que se descargo

2- Elegir las opciones de instalación
Cuando se abra el instalador:
 - presionar Next
 - Aceptr los términos y presionar Next
 - Elegir Complete
 - En la configuración del servicio, dejar marcada la opción Install MongoD as a Service
 - dejar marcada Install MongoDB Compass si aparece. Es una aplicación visual para ver las bases de datos.
 - dejar marcado: Network Service account
 - presionar Install y esperar a que termine. Estas son las opciones recomendadas por la guía oficial de MongoDB para Windows


3- Comprobar que funciona
Cuando termine la instalación:
- Presionar Windows + R
- Escribir services.msc y presionar Enter
- buscar el servicio MongoDB
- confirmar que esté en estado Running o En ejecución. Si está detenido, hacer clic derecho y seleccionar Start

4- cuando ya este instalado, abrimos en la carpeta servidor y ejecutamos el sigueinte comando en terminal: npm install mongodb dotenv

Después se adaptara el archivo servidor.js y el .env para conectarse a la base local, usando esta dirección: mongodb://127.0.0.1:27017

5- Dentro de semana9/servidor, crear un archivo llamado .env (sin .txt) y escribir:


MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=tiendaWeb
PORT=3000

y luego un .gitignore (si lo quieren subir al repo) con esto:

.env
node_modules/

6- se actualiza el servidor.js
7- ejecutamos el servidor npm start
8- si todo sale bien debe salir:

conexion con mongodb correcta
base de datos: tiendaWeb
servidor disponible en http://localhost:3000

9- hay que abrir estas direcciones en el navegador:
- [Servidor de la tienda](http://localhost:3000/)
- [Estado de MongoDB](http://localhost:3000/api/estado)
- [Lista de productos](http://localhost:3000/api/productos)
La primera vez, la lista de productos probablemente será []. Eso es normal: la base de datos está vacía y todavía debemos agregar los productos.

10- Agregar el primer producto
Para probar el método POST, se puede utilizar Postman, despues de agregarlo verificar otra vez la url
de productos para confirmar que se haya creado


--------- Semana 10 -  Mongoose y consultas --------- 


1- Instalar Mongoose
En VS Code, abrir la terminal dentro de:
tiendaWeb/semana10/servidor y ejecutar:

npm install mongoose

2- Crear el modelo Producto
En el explorador de VS Code, dentro de semana10/servidor, crear  una carpeta llamada modelos y dentro de esa carpeta, crear el archivo producto.js y colocar el codigo que ya tiene en el archivo

3- se actualiza servidor.js 
4- ejecutamos el comando npm start y debe salir:

conexion con mongoose correct

5- probamos las siguientes direcciones:

http://localhost:3000/api/
http://localhost:3000/api/productos

Deben seguir los productos que creamos en semana 9 con POST porque Mongoose utiliza la misma base de datos tiendaWeb y la colección productos

--------- Semana 11 -  Manejo de errores y depuración ---------


1- se agregara validación de solicitudes, manejo de errores de Mongoose, control de JSON inválido y respuestas claras en el archivo servidor.js

2- se prueba y se ejecuta: npm start y debe salir mensaje de conexion correcta
3- Probar los errores con los siguientes comandos en otra terminal por aparte y con el servidor encendido dentro de la carpeta servidores de la respectiva semana:

- producto no existe, Esperado: 404 - producto no encontrado: 
Invoke-RestMethod -Uri 'http://localhost:3000/api/productos/99999' -Method Get

- Identificador inválido, Esperado: 400 - identificador inválido: 
  Invoke-RestMethod -Uri 'http://localhost:3000/api/productos/abc' -Method Get

- Precio negativo, Esperado: 400 - datos inválidos:
  Invoke-RestMethod -Uri 'http://localhost:3000/api/productos' -Method Post -ContentType 'application/json' -Body '{"nombre":"producto prueba","precio":-10,"categoria":"accesorios"}'

- Ruta inexistente, Esperado: 404 - ruta no encontrada:
Invoke-RestMethod -Uri 'http://localhost:3000/api/ruta-inventada' -Method Get

--------- Semana 12 - Integración de interfaz y servidor  ---------  

conectaremos la tienda visual con el servidor Express, Mongoose y MongoDB. Así, el catálogo dejará de depender únicamente de los productos escritos directamente en app.js y podrá mostrar los que están guardados en la base de datos

1- abrir la terminal integrada de VS Code y asegurarse de estar dentro de semana12/servidor, donde está el package.json y ejecutar: npm install express mongoose dotenv cors

Esto instala las dependencias que usaremos en el servidor. Si ya están instaladas, npm verificará el proyecto y no necesitás borrar nada

2- se ajusta el archivo producto.js y se crea el modelo, este modelo define los campos que utiliza el catálogo y valida los datos antes de guardarlos

3- se ajusta servidor.js

este servidor tendrá las rutas para consultar, agregar, actualizar y eliminar productos. También habilitará CORS para que la interfaz pueda comunicarse con él

4- se ajusta la interfaz del html
5- se ajusto el app.js, este es el archivo que conecta la página con el servidor mediante fetch. Todo lo que se agrega o elimina se envía a la API; no se modifica únicamente la pantalla
6- se ajusto el css
7- corremos el servidor, npm start


IMPORTANTE:

EN SEMANA 9 EN ADELANTE MHACER EN SERVIDOR EL ARCHIVO .env y que contenga lo siguiente:

MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=tiendaWeb
PORT=3000