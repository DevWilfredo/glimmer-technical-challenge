const tasksService = require('../services/tasks.service');

const getTasks = async (req, res, next) => {
    try {
        const tasks = await tasksService.getAllTasks(req.validated?.query || req.query);
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

const createTask = async (req, res, next) => {
    try {
        const task = await tasksService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await tasksService.updateTask(req.params.id, req.body);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        await tasksService.deleteTask(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
