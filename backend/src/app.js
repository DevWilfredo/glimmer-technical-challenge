const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();

const corsOptions = {
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'].filter(Boolean)
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Task Manager API');
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
