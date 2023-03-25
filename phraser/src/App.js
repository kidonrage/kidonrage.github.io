import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Snackbar, Alert } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Phraser } from './Phraser';
import { QuestionsGenerator } from './QuestionsGenerator';

import { ReactComponent as PhraserLogo } from './logo.svg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F62FE'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
});

function App() {

  const [error, setError] = React.useState(null)

  const location = useLocation();
  console.log(location.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Container>
            <Grid container columnSpacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid item alignItems="center" sx={{ display: 'flex', alignItems: 'center' }}>
                <PhraserLogo />
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <Button
                  component={Link}
                  variant={location.pathname.startsWith('/phraser') ? 'contained' : 'standart'}
                  to="/phraser"
                  sx={{ my: 2, mr: 1, display: 'block' }}
                >
                  Phraser
                </Button>
                <Button
                  component={Link}
                  to="/questions-generator"
                  color="primary"
                  variant={location.pathname.startsWith('/questions-generator') ? 'contained' : 'standart'}
                  sx={{ my: 2, display: 'block' }}
                >
                  Questions generator
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path='/phraser' element={<Phraser setError={setError} />} />
        <Route path='/questions-generator' element={<QuestionsGenerator />} />
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError('')}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider >
  );
}

export default App;
