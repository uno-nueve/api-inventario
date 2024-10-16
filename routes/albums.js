const express = require("express");
const Album = require("../models/albumModel");

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

module.exports = router;
