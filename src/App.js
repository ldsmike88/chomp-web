import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Router from './Router';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00344B',
    },
    secondary: {
      main: '#4AA390',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router />
  </ThemeProvider>
);

export default App;
