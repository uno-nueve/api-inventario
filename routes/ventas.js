const express = require("express");
const Venta = require("../models/ventaModel");
const Album = require("../models/albumModel");

const router = express.Router();

//Obtener todas las ventas
router.get("/sales", async (req, res) => {
    try {
        const sales = await Venta.find().populate({ path: "album" });
        res.status(200).send(sales);
    } catch (error) {
        res.status(500).send({ message: "Error obteniendo los registros de ventas", error });
    }
});

//Obtener una venta por número de orden
router.get("/sales/:id", async (req, res) => {
    try {
        const sale = await Venta.findOne({ ordenNumero: req.params.id }).populate({
            path: "album",
        });

        if (!sale) {
            return res.status(404).send({ message: "Venta no encontrada" });
        }
        res.status(200).send(sale);
    } catch (error) {
        res.status(500).send({ message: "Error obteniendo registro de venta", error });
    }
});

//Eliminar una venta por ID
router.delete("/sales/:id", async (req, res) => {
    try {
        const ventaEliminada = await Venta.findByIdAndDelete(req.params.id);

        if (!ventaEliminada) {
            return res.status(404).send({ message: "Venta no encontrado" });
        }

        res.status(200).send({ message: "Venta eliminado correctamente" });
    } catch (error) {
        res.status(500).send({ message: "Error eliminando venta", error });
    }
});

//Actualizar el stock de un album al devolverlo y modificar el estado de la venta
router.put("/sales/:id/return", async (req, res) => {
    try {
        const venta = await Venta.findOne({ ordenNumero: req.params.id });

        if (!venta) {
            return res.status(404).send({ message: "Venta no encontrada" });
        }

        venta.estado = "Devuelto";

        const album = await Album.findById(venta.album);

        if (!album) {
            return res.status(404).send({ message: "Album no encontrado" });
        }

        if (album.stock === 0) {
            album.estado = "Disponible";
        }

        album.stock = album.stock + 1;
        await album.save();
        await venta.save();

        res.status(200).send({ venta, album });
    } catch (error) {
        res.status(400).send({ message: "Error al devolver album", error });
    }
});

module.exports = router;
