import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography } from '@mui/material';
import './style.css';
// import { io } from 'socket.io-client';
import socketIO from 'socket.io-client';
import { get } from 'lodash';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../components/iconify';

// const socket = socketIO.connect('ws://185.217.131.179:8004');

export default function MainChat(props) {
  const { route } = props;
  const navigation = useNavigate();
  const cat = JSON.parse(localStorage.getItem('userData'));

  const otherID = 4;
  const myID = get(cat, 'data.id', '');

  // const socket = io(`ws://185.217.131.179:8004/chat/?token=${get(cat, 'access', '')}`);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      event.target.value = '';
    }
  };

  const handleKeyDown2 = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      event.target.value = '';
    }
  };

  return (
    <>
      <Helmet>
        <title> Чат </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
          <Button variant="contained" onClick={() => navigation('/dashboard/chat')}>
            Назад
          </Button>
        </Stack>
      </Container>

      {get(cat, 'data.role', '') !== 'dispatcher' ? (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Order owner
            </Typography>
          </Stack>

          <Stack>
            <div className="topUserCard">
              <h1 className="word55">name</h1>
              <p className="word55">+998914568585</p>
            </div>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <div className="someCard">
              <div className="mainMassageCard">
                <div className="cardMassage1">
                  <div className="colorCard1">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eveniet eos fugit officiis illum
                      totam! Animi at vel quos possimus distinctio recusandae dolore voluptas. Delectus, eum ut! Magnam,
                      quaerat nesciunt.
                    </p>
                  </div>
                </div>
                <div className="cardMassage2">
                  <div className="colorCard2">
                    <p>asa</p>
                  </div>
                </div>
                <div className="cardMassage1">
                  <div className="colorCard1">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eveniet eos fugit officiis illum
                      totam! Animi at vel quos possimus distinctio recusandae dolore voluptas. Delectus, eum ut! Magnam,
                      quaerat nesciunt.
                    </p>
                  </div>
                </div>
                <div className="cardMassage2">
                  <div className="colorCard2">
                    <p>asa</p>
                  </div>
                </div>
              </div>
            </div>
          </Stack>

          <Stack>
            <div className="card333">
              <input type="text" placeholder="Message..." className="input22" onKeyDown={handleKeyDown} />
            </div>
          </Stack>
        </Container>
      ) : null}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Driver
          </Typography>
        </Stack>

        <Stack>
          <div className="topUserCard">
            <h1 className="word55">name</h1>
            <p className="word55">+998914568585</p>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <div className="someCard">
            <div className="mainMassageCard">
              <div className="cardMassage1">
                <div className="colorCard1">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eveniet eos fugit officiis illum
                    totam! Animi at vel quos possimus distinctio recusandae dolore voluptas. Delectus, eum ut! Magnam,
                    quaerat nesciunt.
                  </p>
                </div>
              </div>
              <div className="cardMassage2">
                <div className="colorCard2">
                  <p>asa</p>
                </div>
              </div>
              <div className="cardMassage1">
                <div className="colorCard1">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eveniet eos fugit officiis illum
                    totam! Animi at vel quos possimus distinctio recusandae dolore voluptas. Delectus, eum ut! Magnam,
                    quaerat nesciunt.
                  </p>
                </div>
              </div>
              <div className="cardMassage2">
                <div className="colorCard2">
                  <p>asa</p>
                </div>
              </div>
            </div>
          </div>
        </Stack>

        <Stack>
          <div className="card333">
            <input type="text" placeholder="Message..." className="input22" onKeyDown={handleKeyDown2} />
          </div>
        </Stack>
      </Container>
    </>
  );
}
