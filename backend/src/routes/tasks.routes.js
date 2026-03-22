const {Router} = require('express');
const tasksController = require('../controllers/tasks.controller');
const { validate } = require('../middlewares/validate.middleware');
const {
    listTasksQuerySchema,
    createTaskSchema,
    updateTaskSchema,
    taskIdParamSchema
} = require('../validators/tasks.validators');

const router = Router();

router.get('/', validate({ query: listTasksQuerySchema }), tasksController.getTasks);
router.post('/', validate({ body: createTaskSchema }), tasksController.createTask);
router.put(
    '/:id',
    validate({ params: taskIdParamSchema, body: updateTaskSchema }),
    tasksController.updateTask
);
router.delete('/:id', validate({ params: taskIdParamSchema }), tasksController.deleteTask);

module.exports = router;
