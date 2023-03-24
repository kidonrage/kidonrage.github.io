import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Container from '@mui/material/Container';
import { Snackbar, Alert } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link, Route, Routes } from 'react-router-dom';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Container>
            <Grid container columnSpacing={2} item sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid item>
                <PhraserLogo />
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <Button
                  component={Link}
                  to="/phraser"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Phraser
                </Button>
                <Button
                  component={Link}
                  to="/questions-generator"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Questions generator
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path='/phraser' element={<Phraser />} />
        <Route path='/questions-generator' element={<QuestionsGenerator />} />
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!error}
        autoHideDuration={6000}
        message="I love snacks"
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          "{error}"
        </Alert>
      </Snackbar>
    </ThemeProvider >
  );
}

export default App;
