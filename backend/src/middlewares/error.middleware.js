const { HttpError } = require('../utils/http-error');

const notFoundHandler = (req, res, next) => {
    next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        next(error);
        return;
    }

    const statusCode = error.statusCode || 500;
    const responseBody = {
        message: statusCode >= 500 ? 'Internal server error' : error.message
    };

    if (error.details) {
        responseBody.details = error.details;
    }

    if (statusCode >= 500) {
        console.error(error);
    }

    res.status(statusCode).json(responseBody);
};

module.exports = {
    notFoundHandler,
    errorHandler
};
