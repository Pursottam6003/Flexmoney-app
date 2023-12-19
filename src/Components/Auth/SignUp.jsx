import React from 'react';
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Alert, Collapse, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const theme = createTheme();

export default function SignUp() {
  const history = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    const user = formData;

    axios.post('http://localhost:5000/users/register', user).then((response) => {
      console.log(response);
      if (response.status === 200)
        return history('/login');

      setErrorMsg(response.data.message);
      setFormData({});
    }).catch(err => {
      if (err.response) {
        setErrorMsg(err.response.data.message);
      }
      setFormData({});
    })
  };

  const [formData, setFormData] = useState({
    "email": "",
    "password": "",
    "confirmPassword": ""
  });

  const handleChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            my: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mt: 1 }}>
            <img width="100" height="100" src="https://img.icons8.com/plasticine/100/guru.png" alt="guru" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Collapse in={errorMsg?.length !== 0}>
              <Alert
                severity='error'
                variant='outlined'
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorMsg('');
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ my: 3 }}
              >
                {errorMsg}
              </Alert>
            </Collapse>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Grid>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}