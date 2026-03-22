const { createHttpError } = require('../utils/http-error');

const defaultValidationOptions = {
    abortEarly: false,
    convert: true,
    stripUnknown: true
};

const formatJoiDetails = (details) =>
    details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, ''),
        type: detail.type
    }));

const validateSegment = (schema, data, message) => {
    const { value, error } = schema.validate(data, defaultValidationOptions);

    if (error) {
        throw createHttpError(400, message, formatJoiDetails(error.details));
    }

    return value;
};

const validate = ({ params, query, body } = {}) => (req, res, next) => {
    try {
        req.validated = req.validated || {};

        if (params) {
            const validatedParams = validateSegment(params, req.params, 'Invalid route params');
            req.params = validatedParams;
            req.validated.params = validatedParams;
        }

        if (query) {
            const validatedQuery = validateSegment(query, req.query, 'Invalid query params');
            req.query = validatedQuery;
            req.validated.query = validatedQuery;
        }

        if (body) {
            const validatedBody = validateSegment(body, req.body, 'Invalid request body');
            req.body = validatedBody;
            req.validated.body = validatedBody;
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    validate
};
