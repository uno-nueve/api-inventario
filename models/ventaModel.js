const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema(
    {
        ordenNumero: {
            type: String,
            required: true,
        },
        nombreCliente: {
            type: String,
            required: true,
        },
        album: {
            type: mongoose.Types.ObjectId,
            ref: "Album",
        },
        monto: {
            type: Number,
            required: true,
        },
        estado: {
            type: String,
            enum: ["Carrito", "Vendido", "Devuelto"],
            default: "Vendido",
        },
        fechaVenta: {
            type: Date,
        },
        fechaDevolucion: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Venta = mongoose.model("ventas", ventaSchema);
module.exports = Venta;
