const mongoose = require("mongoose");

const albumSchema = mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        artista: {
            type: String,
            required: true,
        },
        genero: {
            type: String,
            required: true,
        },
        estado: {
            type: String,
            enum: ["Disponible", "Alquilado", "Vendido", "Agotado"],
            default: "Disponible",
        },
        fechaAlquiler: {
            type: Date,
        },
        fechaCompra: {
            type: Date,
        },
        fechaDevolución: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Album = mongoose.Model("albums", albumSchema);
module.exports = Album;
