const Joi = require('joi');

const titleSchema = Joi.string().trim().min(1).max(255);
const descriptionSchema = Joi.string().trim().allow('', null);

const listTasksQuerySchema = Joi.object({
    search: Joi.string().trim().allow('').optional().default(''),
    completed: Joi.boolean().truthy('true').truthy('1').falsy('false').falsy('0').optional(),
    page: Joi.number().integer().min(1).optional().default(1),
    limit: Joi.number().integer().min(1).max(50).optional().default(10)
});

const taskIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const createTaskSchema = Joi.object({
    title: titleSchema.required(),
    description: descriptionSchema.optional(),
    completed: Joi.boolean().optional()
});

const updateTaskSchema = Joi.object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    completed: Joi.boolean().optional()
}).min(1);

module.exports = {
    listTasksQuerySchema,
    taskIdParamSchema,
    createTaskSchema,
    updateTaskSchema
};
