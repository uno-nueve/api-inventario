const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
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
            enum: ["Disponible", "Agotado"],
            default: "Disponible",
        },
        stock: {
            type: Number,
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

const Album = mongoose.model("albums", albumSchema);
module.exports = Album;
