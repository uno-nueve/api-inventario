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
        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                height: {
                    type: Number,
                },
                width: {
                    type: Number,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Album = mongoose.model("albums", albumSchema);
module.exports = Album;
