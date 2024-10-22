const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("Conexión exitosa con base de datos");
    } catch (error) {
        console.error("Error en conexión con base de datos", error);
        process.exit(1);
    }
};

module.exports = dbConnect;
