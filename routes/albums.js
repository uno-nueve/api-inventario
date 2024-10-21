const express = require("express");
const Album = require("../models/albumModel");
const transactionMiddleware = require("../middlewares/transactionMiddleware");
const Venta = require("../models/ventaModel");

const router = express.Router();

//Obtener todos los albums
router.get("/albums", async (req, res) => {
    try {
        const albums = await Album.find();
        res.status(200).send(albums);
    } catch (error) {
        res.status(500).send({ message: "Error obteniendo los albums", error });
    }
});

//Obtener un album por ID
router.get("/albums/:id", async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).send({ message: "Album no encontrado" });
        }
        res.status(200).send(album);
    } catch (error) {
        res.status(500).send({ message: "Error obteniendo el album", error });
    }
});

//Crear un album
router.post("/albums", async (req, res) => {
    const data = req.body;
    try {
        const newAlbum = await Album.create(data);
        res.status(201).send(newAlbum);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Actualizar un album por ID
router.put("/albums/:id", async (req, res) => {
    try {
        const albumActualizado = await Album.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!albumActualizado) {
            return res.status(404).send({ message: "Album no encontrado" });
        }

        res.status(200).send(albumActualizado);
    } catch (error) {
        res.status(400).send({ message: "Error actualizando album", error });
    }
});

//Eliminar un album por ID
router.delete("/albums/:id", async (req, res) => {
    try {
        const albumEliminado = await Album.findByIdAndDelete(req.params.id);

        if (!albumEliminado) {
            return res.status(404).send({ message: "Album no encontrado" });
        }

        res.status(200).send({ message: "Album eliminado correctamente" });
    } catch (error) {
        res.status(500).send({ message: "Error eliminando album", error });
    }
});

/* ************************************************************************************ */

//Obtener albums según filtros de búsqueda
router.get("/albums/catalog/search", async (req, res) => {
    const { artista, genero, estado } = req.query;

    try {
        const query = {};
        if (artista) query.artista = artista;
        if (genero) query.genero = genero;
        if (estado) query.estado = estado;

        const albums = await Album.find(query);

        if (!albums.length) {
            return res.status(404).send({
                message: "No se encontraron albums con los criterios proporcionados",
            });
        }

        res.status(200).send(albums);
    } catch (error) {
        res.status(500).send({ message: "Error al buscar albums", error });
    }
});

//Actualizar stock de un album al comprar
router.put("/albums/:id/buy", transactionMiddleware, async (req, res) => {
    try {
        const { nombreCliente, monto } = req.body;
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).send({ message: "Album no encontrado" });
        }

        if (album.stock === 0) {
            return res.status(400).send({ message: "Album agotado" });
        }

        if (album.stock === 1) {
            album.estado = "Agotado";
        }

        album.stock = album.stock - 1;
        await album.save();

        const venta = await Venta.create({
            ordenNumero: res.locals.idTransaccion,
            nombreCliente,
            album,
            monto,
            fechaVenta: new Date(),
        });

        res.status(200).send({ venta, album });
    } catch (error) {
        res.status(400).send({ message: "Error al actualizar el stock del album", error });
    }
});

module.exports = router;
