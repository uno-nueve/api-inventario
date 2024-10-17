const express = require("express");
const dbConnect = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world!");
});

dbConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server corriendo en puerto: http://${HOST}:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Servidor no inicializado. Error con la base de datos");
    });
