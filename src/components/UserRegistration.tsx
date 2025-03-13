import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '400px',
  margin: '0 auto',
}));

interface UserRegistrationProps {
  onRegister: (username: string) => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }
    onRegister(username.trim());
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom align="center">
        Welcome to Country Outline Game
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3 }}>
        Please enter your name to start playing
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Name"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError('');
          }}
          error={!!error}
          helperText={error}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={!username.trim()}
        >
          Start Playing
        </Button>
      </form>
    </StyledPaper>
  );
};

export default UserRegistration; 