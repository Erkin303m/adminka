import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import './style.css';
import { io } from 'socket.io-client';
import { get } from 'lodash';
import axios from 'axios';

export default function MainChat(props) {
  const { route } = props;
  const token = get(route, 'params.item', '');

  // const socket = io.connect('http://localhost:4000/');
  // socket.on('Data', (data) => {
  //   console.log(data);
  // });

  // socket.on('Temperature', (data) => {
  //   console.log(data);
  // });

  // socket.emmit('Realtime', 'Realll');

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await axios
        .post(`http://185.217.131.179:8888/api/v1/company/token/obtain/token=${token}`)
        .then((ress) => {
          console.log('login', ress);
          event.target.value = '';
        })
        .catch((err) => {
          console.log('sendData error', err);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title> Чат </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Main Chat
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
            </div>
          </div>
        </Stack>

        <Stack>
          <div className="card333">
            <input type="text" placeholder="Message..." className="input22" onKeyDown={handleKeyDown} />
          </div>
        </Stack>
      </Container>
    </>
  );
}
