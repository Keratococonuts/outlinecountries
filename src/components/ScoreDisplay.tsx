import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ScoreContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

interface ScoreDisplayProps {
  username: string;
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ username, score }) => {
  return (
    <ScoreContainer>
      <Typography variant="subtitle1" component="div">
        {username}
      </Typography>
      <Typography variant="h6" component="div" color="primary">
        Score: {score}
      </Typography>
    </ScoreContainer>
  );
};

export default ScoreDisplay; 