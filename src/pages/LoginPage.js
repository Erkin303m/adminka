import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import Iconify from '../components/iconify';
import useResponsive from '../hooks/useResponsive';
import './style.css';
import IMG from './LOGISTIC.png';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  const navigation = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const mdUp = useResponsive('up', 'md');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const sendData = async () => {
    await axios
      .post(`http://185.217.131.179:8888/api/v1/company/token/obtain`, {
        phone_number: login,
        password,
      })
      .then((ress) => {
        console.log('login', ress);
        // loginToScreen(ress.data.access);

        if (get(ress, 'data.data.role', '') === 'director') {
          navigation('/dashboard/app');
          localStorage.setItem('userData', JSON.stringify(ress.data));
          // window.location.reload(true);
        } else if (get(ress, 'data.data.role', '') === 'manager' || get(ress, 'data.data.role', '') === 'dispatcher') {
          navigation('/dashboard/products');
          localStorage.setItem('userData', JSON.stringify(ress.data));
          // window.location.reload(true);
        } else {
          swal({
            title: "Sorry, you don't have access!",
            text: 'This site is for authorized users only',
            icon: 'warning',
            dangerMode: false,
            timer: 3000,
          });
        }

        const data = { type: 'ADD_USER', payload: ress.data };
        dispatch(data);
      })
      .catch((err) => {
        console.log('sendData error', err);
        swal({
          title: 'Login or password error!',
          text: 'Check and try again',
          icon: 'error',
          dangerMode: true,
          timer: 3000,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title> Login</title>
      </Helmet>

      <StyledRoot>
        <img src={IMG} alt="" className="img2" />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi welcome
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Sign up if you don't have an account?
            </Typography>

            <>
              <Stack spacing={3}>
                <TextField name="email" label="Phone number" onChange={(v) => setLogin(v.target.value)} />
                <TextField
                  name="password"
                  label="Password"
                  onChange={(v) => setPassword(v.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={() => sendData()}
                className="salom"
              >
                Sign in
              </LoadingButton>
            </>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
