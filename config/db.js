const mongoose = require("mongoose");
// const MONGO_URL = process.env.MONGO_URL;

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dbVictrolaApi");
        console.log("Conexión exitosa con base de datos");
    } catch (error) {
        console.error("Error en conexión con base de datos", error);
        process.exit(1);
    }
};

module.exports = dbConnect;
