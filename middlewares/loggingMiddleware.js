const loggingMiddleware = (req, res, next) => {
    const method = req.method;
    const route = req.url;
    const time = new Date().toLocaleString();

    console.log(`[${time}] ${method} ${route}`);
    next();
};

module.exports = loggingMiddleware;
