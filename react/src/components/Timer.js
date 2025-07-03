import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { PlayArrow, Pause, RestartAlt } from '@mui/icons-material';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#ffffff', maxWidth: 400, margin: '0 auto' }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Typography variant="h3" component="div" sx={{ fontFamily: 'monospace', color: '#1976d2' }}>
          {formatTime(seconds)}
        </Typography>
        <Box display="flex" gap={2}>
          {!isRunning && seconds === 0 && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrow />}
              onClick={handleStart}
              sx={{ borderRadius: 2, padding: '10px 20px' }}
            >
              Start
            </Button>
          )}
          {isRunning && (
            <Button
              variant="contained"
              color="warning"
              startIcon={<Pause />}
              onClick={handlePause}
              sx={{ borderRadius: 2, padding: '10px 20px' }}
            >
              Pause
            </Button>
          )}
          {!isRunning && seconds > 0 && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrow />}
              onClick={handleStart}
              sx={{ borderRadius: 2, padding: '10px 20px' }}
            >
              Resume
            </Button>
          )}
          {seconds > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<RestartAlt />}
              onClick={handleReset}
              sx={{ borderRadius: 2, padding: '10px 20px' }}
            >
              Reset
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default Timer;
