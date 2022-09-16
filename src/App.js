import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './Layout';

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
    <Layout />
  </ThemeProvider>
);

export default App;
