import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import './style.css';
import { useState } from 'react';

export default function MainChat(props) {
  const { route } = props;
  console.log('main chat id=>', route.params.id);

  // const [message, setMessage] = useState('');
  const handleKeyDown = (event) => {
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
