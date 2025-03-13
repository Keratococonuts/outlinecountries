import React from 'react';
import { styled } from '@mui/material/styles';

const StyledSvg = styled('svg')({
  width: '100%',
  maxWidth: '200px',
  height: 'auto',
  marginBottom: '16px',
});

interface CountryOutlineProps {
  country: string;
}

const CountryOutline: React.FC<CountryOutlineProps> = ({ country }) => {
  // Generate a random shape based on the country name
  const getRandomShape = () => {
    const shapes = [
      // Rectangle
      <rect x="20" y="20" width="160" height="120" fill="none" stroke="currentColor" strokeWidth="2" />,
      // Circle
      <circle cx="100" cy="80" r="60" fill="none" stroke="currentColor" strokeWidth="2" />,
      // Triangle
      <polygon points="100,20 20,180 180,180" fill="none" stroke="currentColor" strokeWidth="2" />,
      // Hexagon
      <polygon points="100,20 180,60 180,140 100,180 20,140 20,60" fill="none" stroke="currentColor" strokeWidth="2" />,
      // Star
      <path d="M100,20 L120,80 L180,80 L130,120 L150,180 L100,140 L50,180 L70,120 L20,80 L80,80 Z" fill="none" stroke="currentColor" strokeWidth="2" />,
    ];
    
    // Use the country name to consistently select the same shape
    const index = country.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % shapes.length;
    return shapes[index];
  };

  return (
    <StyledSvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {getRandomShape()}
    </StyledSvg>
  );
};

export default CountryOutline; 