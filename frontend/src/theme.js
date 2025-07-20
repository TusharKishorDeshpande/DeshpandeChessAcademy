import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700', // Gold
      light: '#FFF0A3',
      dark: '#B7950B',
      contrastText: '#000000',
    },
    secondary: {
      main: '#000000', // Black
      light: '#2C2C2C',
      dark: '#000000',
      contrastText: '#FFD700',
    },
    background: {
      default: '#121212',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFD700',
      secondary: '#FFF0A3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#FFD700',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      marginBottom: '0.875rem',
      color: '#FFD700',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      marginBottom: '0.75rem',
      color: '#FFD700',
    },
  },
});

export default theme;