import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const TimerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#1e1e2f',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
  color: 'white',
  maxWidth: '300px',
  margin: '0 auto',
});

const TimeDisplay = styled(Typography)({
  fontSize: '48px',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  marginBottom: '16px',
  color: '#61dafb',
});

const ControlButtons = styled(Box)({
  display: 'flex',
  gap: '12px',
});

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

  return (
    <TimerContainer>
      <TimeDisplay variant="h3">{formatTime(seconds)}</TimeDisplay>
      <ControlButtons>
        {!isRunning && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            sx={{ borderRadius: '8px', textTransform: 'none', padding: '8px 16px' }}
          >
            Start
          </Button>
        )}
        {isRunning && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePause}
            sx={{ borderRadius: '8px', textTransform: 'none', padding: '8px 16px' }}
          >
            Pause
          </Button>
        )}
        <Button
          variant="outlined"
          color="error"
          onClick={handleReset}
          sx={{ borderRadius: '8px', textTransform: 'none', padding: '8px 16px', borderColor: '#ff5252', color: '#ff5252' }}
        >
          Reset
        </Button>
      </ControlButtons>
    </TimerContainer>
  );
};

export default Timer;
