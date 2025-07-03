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

const ErrorMessage = styled(Typography)({
  color: '#ff5252',
  marginTop: '16px',
  fontSize: '14px',
});

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial timer data on component mount
  useEffect(() => {
    const fetchTimerData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/timer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch timer data');
        }

        const result = await response.json();
        if (result.data && result.data.totalSeconds) {
          setSeconds(result.data.totalSeconds);
        }
      } catch (err) {
        setError('Could not load timer data from server');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimerData();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Function to save timer data to server
  const saveTimerData = async (totalSeconds) => {
    try {
      const response = await fetch('/api/timer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalSeconds }),
      });

      if (!response.ok) {
        throw new Error('Failed to save timer data');
      }

      return await response.json();
    } catch (err) {
      setError('Could not save timer data to server');
      console.error(err);
      throw err;
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setError('');
  };

  const handlePause = async () => {
    setIsRunning(false);
    try {
      await saveTimerData(seconds);
      setError('');
    } catch (err) {
      setError('Could not save timer data to server');
    }
  };

  const handleReset = async () => {
    setIsRunning(false);
    try {
      await saveTimerData(0);
      setSeconds(0);
      setError('');
    } catch (err) {
      setError('Could not reset timer data on server');
    }
  };

  return (
    <TimerContainer>
      {isLoading ? (
        <Typography variant="h6" sx={{ color: '#61dafb', marginBottom: '16px' }}>
          Loading timer...
        </Typography>
      ) : (
        <TimeDisplay variant="h3">{formatTime(seconds)}</TimeDisplay>
      )}
      <ControlButtons>
        {!isRunning ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            sx={{ borderRadius: '8px', textTransform: 'none', padding: '8px 16px' }}
            disabled={isLoading}
          >
            Start
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePause}
            sx={{ borderRadius: '8px', textTransform: 'none', padding: '8px 16px' }}
            disabled={isLoading}
          >
            Pause
          </Button>
        )}
        <Button
          variant="outlined"
          color="error"
          onClick={handleReset}
          sx={{ borderRadius: '8px', textTransform: 'none', padding: '8px 16px', borderColor: '#ff5252', color: '#ff5252' }}
          disabled={isLoading}
        >
          Reset
        </Button>
      </ControlButtons>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TimerContainer>
  );
};

export default Timer;
