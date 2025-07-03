const express = require('express');
const mongoose = require('mongoose');

// Для работы с базой данных
const mongoDb = mongoose.connection;

const router = express.Router();

// Схема для хранения времени таймера
const TimerSchema = new mongoose.Schema({
  totalSeconds: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Timer = mongoose.model('Timer', TimerSchema);

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/timer - Сохранение времени таймера
router.post('/timer', async (req, res) => {
  try {
    const { totalSeconds } = req.body;

    if (!totalSeconds || typeof totalSeconds !== 'number' || totalSeconds < 0) {
      return res.status(400).json({ error: 'Invalid input: totalSeconds must be a positive number' });
    }

    const newTimer = new Timer({ totalSeconds });
    const savedTimer = await newTimer.save();

    res.status(201).json({
      message: 'Timer data saved successfully',
      data: savedTimer
    });
  } catch (error) {
    console.error('Error saving timer data:', error);
    res.status(500).json({ error: 'Internal server error while saving timer data' });
  }
});

// GET /api/timer - Получение последнего времени таймера
router.get('/timer', async (req, res) => {
  try {
    const latestTimer = await Timer.findOne().sort({ createdAt: -1 });

    if (!latestTimer) {
      return res.status(404).json({ error: 'No timer data found' });
    }

    res.json({
      message: 'Timer data retrieved successfully',
      data: latestTimer
    });
  } catch (error) {
    console.error('Error fetching timer data:', error);
    res.status(500).json({ error: 'Internal server error while fetching timer data' });
  }
});

module.exports = router;
