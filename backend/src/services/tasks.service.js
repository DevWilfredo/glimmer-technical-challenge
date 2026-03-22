const prisma = require('../db/prisma');
const { createHttpError } = require('../utils/http-error');

const normalizeDescription = (description) => {
    if (description === undefined) {
        return undefined;
    }

    return description === '' ? null : description;
};

const buildListFilters = ({ search, completed }) => {
    const where = {};

    if (typeof completed === 'boolean') {
        where.completed = completed;
    }

    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ];
    }

    return where;
};

const getAllTasks = async ({ search = '', completed, page = 1, limit = 10 } = {}) => {
    const safePage = Number(page);
    const safeLimit = Number(limit);
    const skip = (safePage - 1) * safeLimit;
    const where = buildListFilters({ search, completed });

    const [total, data] = await prisma.$transaction([
        prisma.task.count({ where }),
        prisma.task.findMany({
            where,
            orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
            skip,
            take: safeLimit
        })
    ]);

    const totalPages = total ? Math.ceil(total / safeLimit) : 1;

    return {
        data,
        pagination: {
            page: safePage,
            limit: safeLimit,
            total,
            totalPages,
            hasNextPage: safePage < totalPages,
            hasPreviousPage: safePage > 1
        }
    };
};

const createTask = async ({ title, description, completed = false }) => {
    const normalizedDescription = normalizeDescription(description) ?? null;
    return prisma.task.create({
        data: {
            title,
            description: normalizedDescription,
            completed
        }
    });
};

const updateTask = async (taskId, payload) => {
    const data = {};

    if (payload.title !== undefined) {
        data.title = payload.title;
    }

    if (payload.description !== undefined) {
        data.description = normalizeDescription(payload.description);
    }

    if (payload.completed !== undefined) {
        data.completed = payload.completed;
    }

    try {
        return await prisma.task.update({
            where: { id: Number(taskId) },
            data
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw createHttpError(404, `Task with id ${taskId} was not found`);
        }

        throw error;
    }
};

const deleteTask = async (taskId) => {
    try {
        await prisma.task.delete({
            where: { id: Number(taskId) }
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw createHttpError(404, `Task with id ${taskId} was not found`);
        }

        throw error;
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};
