import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import CountryOutline from './CountryOutline';
import UserRegistration from './UserRegistration';
import ScoreDisplay from './ScoreDisplay';

const GameContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '800px',
  margin: '0 auto',
}));

const CountryOption = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    transform: 'scale(1.02)',
  },
}));

interface Country {
  name: string;
}

interface GameProps {
  isHost: boolean;
}

const Game: React.FC<GameProps> = ({ isHost }) => {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isRoundActive, setIsRoundActive] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  // Country data
  const countries: Country[] = [
    { name: 'France' },
    { name: 'Germany' },
    { name: 'Spain' },
    { name: 'Italy' },
    { name: 'Netherlands' },
    { name: 'Belgium' },
    { name: 'Switzerland' },
    { name: 'Austria' },
  ];

  const startNewRound = () => {
    const correctCountry = countries[Math.floor(Math.random() * countries.length)];
    const otherOptions = countries
      .filter(country => country.name !== correctCountry.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    setCurrentCountry(correctCountry);
    setOptions([...otherOptions, correctCountry].sort(() => Math.random() - 0.5));
    setTimeLeft(30);
    setIsRoundActive(true);
  };

  const handleOptionClick = (option: Country) => {
    if (!isRoundActive) return;
    
    const isCorrect = option.name === currentCountry?.name;
    if (isCorrect) {
      setScore(prev => prev + 1);
      // Save score to localStorage
      localStorage.setItem(`score_${username}`, (score + 1).toString());
    }
    setIsRoundActive(false);
  };

  const handleRegister = (name: string) => {
    setUsername(name);
    // Load existing score from localStorage
    const savedScore = localStorage.getItem(`score_${name}`);
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRoundActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRoundActive(false);
    }
    return () => clearInterval(timer);
  }, [isRoundActive, timeLeft]);

  if (!username) {
    return <UserRegistration onRegister={handleRegister} />;
  }

  return (
    <GameContainer>
      <ScoreDisplay username={username} score={score} />
      
      <Typography variant="h4" gutterBottom align="center">
        Country Outline Game
      </Typography>
      
      {isHost && (
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={startNewRound}
            disabled={isRoundActive}
          >
            Start New Round
          </Button>
        </Box>
      )}

      {isRoundActive && (
        <Typography variant="h5" gutterBottom align="center">
          Time left: {timeLeft}s
        </Typography>
      )}

      {currentCountry && (
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <CountryOutline country={currentCountry.name} />
          <Typography variant="h3" gutterBottom>
            {currentCountry.name}
          </Typography>
        </Box>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {options.map((option, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <CountryOption
              onClick={() => handleOptionClick(option)}
              sx={{
                backgroundColor: isRoundActive ? 'background.paper' : 'grey.200',
              }}
            >
              <CountryOutline country={option.name} />
              <Typography variant="h6">
                {option.name}
              </Typography>
            </CountryOption>
          </Grid>
        ))}
      </Grid>
    </GameContainer>
  );
};

export default Game; 