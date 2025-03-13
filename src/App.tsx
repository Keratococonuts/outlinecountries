import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Game from './components/Game';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  // For testing, we'll set isHost to true
  // In the real application, this would be determined by the server
  const isHost = true;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Game isHost={isHost} />
    </ThemeProvider>
  );
}

export default App;
