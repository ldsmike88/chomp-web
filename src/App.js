import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import Layout from './Layout';

const App = () => (
  <StyledEngineProvider injectFirst>
    <CssBaseline />
    <Layout />
  </StyledEngineProvider>
);

export default App;
