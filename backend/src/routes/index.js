const {Router} = require('express');

const tasksRouter = require('./tasks.routes');

const router = Router();

router.use('/tasks', tasksRouter)

module.exports = router;