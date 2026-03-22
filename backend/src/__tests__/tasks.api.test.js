const request = require('supertest');
const app = require('../app');
const tasksService = require('../services/tasks.service');

jest.mock('../services/tasks.service', () => ({
    getAllTasks: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn()
}));

describe('Tasks API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('GET /api/tasks returns paginated payload and forwards query filters', async () => {
        tasksService.getAllTasks.mockResolvedValue({
            data: [],
            pagination: {
                page: 2,
                limit: 3,
                total: 0,
                totalPages: 1,
                hasNextPage: false,
                hasPreviousPage: true
            }
        });

        const response = await request(app).get('/api/tasks?search=demo&completed=true&page=2&limit=3');

        expect(response.status).toBe(200);
        expect(response.body.pagination.page).toBe(2);
        expect(tasksService.getAllTasks).toHaveBeenCalledWith({
            search: 'demo',
            completed: true,
            page: 2,
            limit: 3
        });
    });

    it('POST /api/tasks validates request body', async () => {
        const response = await request(app).post('/api/tasks').send({
            title: '   '
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid request body');
    });

    it('DELETE /api/tasks/:id returns 204 when task is deleted', async () => {
        tasksService.deleteTask.mockResolvedValue(undefined);

        const response = await request(app).delete('/api/tasks/1');

        expect(response.status).toBe(204);
        expect(tasksService.deleteTask).toHaveBeenCalledWith(1);
    });

    it('PUT /api/tasks/:id updates a task', async () => {
        tasksService.updateTask.mockResolvedValue({
            id: 1,
            title: 'Task updated',
            description: 'Updated description',
            completed: true,
            created_at: new Date().toISOString()
        });

        const response = await request(app).put('/api/tasks/1').send({
            title: 'Task updated',
            description: 'Updated description'
        });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Task updated');
        expect(tasksService.updateTask).toHaveBeenCalledWith(1, {
            title: 'Task updated',
            description: 'Updated description'
        });
    });
});
