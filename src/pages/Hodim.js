import { Helmet } from 'react-helmet-async';
import { filter, get } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import axios from 'axios';

import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'company', label: 'Информация о заказе', alignRight: false },
  { id: 'drop', label: 'Падение места', alignRight: false },
  { id: 'role', label: 'Метод оплаты', alignRight: false },
  { id: 'isVerified', label: 'Проверено', alignRight: false },
  { id: 'status', label: 'Статус', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export default function UserPage() {
  const [userName, setUserName] = useState('');
  const [payment, setPayment] = useState('');
  const [firstPayment, setFirstPayment] = useState('');
  const [waiting, setWaiting] = useState('');
  const [drop, setDrop] = useState('');
  const [owner, setOwner] = useState('');
  const [massa, setMassa] = useState('');
  const [info, setInfo] = useState('');
  const [status, setStatus] = useState('');
  const [country, setCuntry] = useState('');
  const [city, setCity] = useState('');
  const [paymant, setPaymant] = useState('');

  const sendData = async () => {
    await axios
      .post(`http://185.217.131.179:8888/api/v1/dashboard/director`, {
        name: userName,
        packageMethod: 'string',
        paymentMethod: payment,
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
        <title> Сотрудники</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Сотрудники
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
            placeholder="paymentMethod"
            className="input2"
            onChange={(v) => setPayment(v.target.value)}
          />
        </div>

        <div className="card3">
          <input
            type="number"
            placeholder="first_payment"
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
          <input type="text" placeholder="Status" className="input2" onChange={(v) => setStatus(v.target.value)} />
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
            list="data"
            className="input2"
            onChange={(v) => setPaymant(v.target.value)}
          />
          <datalist id="data">
            <option value="manager" />
            <option value="director" />
            <option value="dispatcher" />
          </datalist>
        </div>
      </div>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {' '}
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => sendData()}>
            Новый
          </Button>
        </Stack>
      </Container>
    </>
  );
}
