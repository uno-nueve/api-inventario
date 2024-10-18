//Crea un ID random de 6 dígitos para cada transacción
const transactionMiddleware = (req, res, next) => {
    let transactionID = "#";

    function getRandomNumber(m) {
        return Math.floor(Math.random() * m);
    }

    for (let i = 0; i <= 6; i++) {
        const n = getRandomNumber(9);
        transactionID = transactionID.concat(n);
    }

    res.locals.idTransaccion = transactionID;
    next();
};

module.exports = transactionMiddleware;
