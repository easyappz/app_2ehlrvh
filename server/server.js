const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const apiRoutes = require('./apiRoutes');

// Для работы с express
const app = express();

// Middleware для обработки JSON-запросов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

/**
 * Подключение к базе данных MongoDB
 */
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Проверка состояния подключения к базе данных
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Экспорт приложения для возможного использования в тестах
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
