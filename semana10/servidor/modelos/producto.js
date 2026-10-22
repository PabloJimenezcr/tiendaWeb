
/* semana 10 - modelo de productos con mongoose */

/* Este modelo define las reglas de cada producto. Mongoose utiliza automáticamente la 
colección productos, así que podemos continuar usando los datos de la semana 9 */

const mongoose = require("mongoose");

const esquemaProducto = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: [true, "el id es obligatorio"],
            unique: true,
            min: [1, "el id debe ser positivo"]
        },
        nombre: {
            type: String,
            required: [true, "el nombre es obligatorio"],
            trim: true,
            minlength: [2, "el nombre debe tener al menos 2 caracteres"]
        },
        precio: {
            type: Number,
            required: [true, "el precio es obligatorio"],
            min: [0.01, "el precio debe ser mayor que cero"]
        },
        categoria: {
            type: String,
            required: [true, "la categoria es obligatoria"],
            trim: true,
            minlength: [2, "la categoria debe tener al menos 2 caracteres"]
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Producto", esquemaProducto);
