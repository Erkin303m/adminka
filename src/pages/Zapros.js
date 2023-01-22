import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Stack, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

import Iconify from '../components/iconify';

export default function UserPage() {
  const [userName, setUserName] = useState('');
  const [firstPayment, setFirstPayment] = useState('');
  const [waiting, setWaiting] = useState('');
  const [drop, setDrop] = useState('');
  const [owner, setOwner] = useState('');
  const [massa, setMassa] = useState('');
  const [info, setInfo] = useState('');
  const [status, setStatus] = useState('');
  const [country, setCuntry] = useState('');
  const [city, setCity] = useState('');
  const [packages, setPackages] = useState('');
  const [cash, setCash] = useState('');

  const sendData = async () => {
    await axios
      .post(`http://185.217.131.179:8888/api/v1/company/order`, {
        name: userName,
        packageMethod: packages,
        paymentMethod: cash,
        first_payment: firstPayment,
        pending_of_place: waiting,
        drop_of_place: drop,
        order_owner: owner,
        order_weight: massa,
        order_info: info,
        status,
        customs: [1],
        country,
        city,
      })
      .then((ress) => {
        console.log('success', ress);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <>
      <Helmet>
        <title> Запрос</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Запрос
          </Typography>
        </Stack>
      </Container>

      <div className="card2">
        <div className="card3">
          <input type="text" placeholder="Имя" className="input2" onChange={(v) => setUserName(v.target.value)} />
        </div>
        <div className="card3">
          <input
            type="text"
            placeholder="Метод упаковки"
            className="input2"
            onChange={(v) => setPackages(v.target.value)}
          />
        </div>

        <div className="card3">
          <input
            type="number"
            placeholder="Первый взнос"
            className="input2"
            onChange={(v) => setFirstPayment(v.target.value)}
          />
        </div>
        <div className="card3">
          <input
            type="text"
            placeholder="В ожидании места"
            className="input2"
            onChange={(v) => setWaiting(v.target.value)}
          />
        </div>

        <div className="card3">
          <input type="text" placeholder="Падение места" className="input2" onChange={(v) => setDrop(v.target.value)} />
        </div>
        <div className="card3">
          <input
            type="text"
            placeholder="Владелец заказа"
            className="input2"
            onChange={(v) => setOwner(v.target.value)}
          />
        </div>

        <div className="card3">
          <input type="number" placeholder="Вес заказа" className="input2" onChange={(v) => setMassa(v.target.value)} />
        </div>
        <div className="card3">
          <input
            type="text"
            placeholder="Информация о заказе"
            className="input2"
            onChange={(v) => setInfo(v.target.value)}
          />
        </div>

        <div className="card3">
          <input
            type="text"
            placeholder="Status"
            list="data"
            className="input2"
            onChange={(v) => setStatus(v.target.value)}
          />
          <datalist id="data">
            <option value="sending" />
            <option value="arrived" />
            <option value="way" />
            <option value="approved" />
          </datalist>
        </div>

        <div className="card3">
          <input type="text" placeholder="Страна" className="input2" onChange={(v) => setCuntry(v.target.value)} />
        </div>

        <div className="card3">
          <input type="text" placeholder="Город" className="input2" onChange={(v) => setCity(v.target.value)} />
        </div>

        <div className="card3">
          <input
            type="text"
            placeholder="Payment"
            list="data3"
            className="input2"
            onChange={(v) => setCash(v.target.value)}
          />
          <datalist id="data3">
            <option value="cash" />
            <option value="card" />
          </datalist>
        </div>
      </div>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {' '}
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => sendData()}>
            Новый Запрос
          </Button>
        </Stack>
      </Container>
    </>
  );
}
