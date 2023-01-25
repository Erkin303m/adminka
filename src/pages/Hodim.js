import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { get } from 'lodash';

import { UserListHead } from '../sections/@dashboard/user';

import USERLIST from '../_mock/user';
import Scrollbar from '../components/scrollbar';

import Label from '../components/label';

import Iconify from '../components/iconify';

const TABLE_HEAD = [
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'company', label: 'Role', alignRight: false },
  { id: 'drop', label: 'Password', alignRight: false },
  { id: 'role', label: 'Метод оплаты', alignRight: false },
];

export default function UserPage() {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [phone, setPhone] = useState('');
  const [mainData, setMainData] = useState([]);
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [experience, setExperience] = useState('');
  console.log(avatar);
  useEffect(() => {
    sendWorkers();
  }, []);
  const cat = JSON.parse(localStorage.getItem('userData'));

  const sendData = async () => {
    await axios
      .post(`http://185.217.131.179:8888/api/v1/dashboard/director/`, {
        first_name: userName,
        last_name: lastName,
        middle_name: middleName,
        birthday,
        gender,
        avatar,
        experience,
        password_1: password1,
        password_2: password2,
        phone_number: phone,
        role,
      })
      .then((ress) => {
        console.log('success', ress);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const sendWorkers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .get(`http://185.217.131.179:8888/api/v1/dashboard/director`, config)
      .then((ress) => {
        console.log('success sendWorkers:', ress);
      })
      .catch((err) => {
        console.log('error sendWorkers:', err);
      });
  };
  const search = (item) => {
    const a = mainData.filter((s) => {
      return s.name.toLowerCase().includes(item.toLowerCase());
    });
    setMainData(a);
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
          <input type="text" placeholder="last_name" className="input2" onChange={(v) => setLastName(v.target.value)} />
        </div>

        <div className="card3">
          <input
            type="text"
            placeholder="middleName"
            className="input2"
            onChange={(v) => setMiddleName(v.target.value)}
          />
        </div>

        <div className="card3">
          <input type="date" placeholder="date" className="input2" onChange={(v) => setBirthday(v.target.value)} />
        </div>

        <div className="card3">
          <input type="text" placeholder="gender" className="input2" onChange={(v) => setGender(v.target.value)} />
        </div>

        <div className="card3">
          <input type="file" placeholder="avatar" className="input2" onChange={(v) => setAvatar(v.target.value)} />
        </div>

        <div className="card3">
          <input
            type="text"
            placeholder="experience"
            className="input2"
            onChange={(v) => setExperience(v.target.value)}
          />
        </div>

        <div className="card3">
          <input
            type="text"
            placeholder="Role"
            list="data"
            className="input2"
            onChange={(v) => setRole(v.target.value)}
          />
          <datalist id="data">
            <option value="manager" />
            <option value="director" />
            <option value="dispatcher" />
          </datalist>
        </div>

        <div className="card3">
          <input
            type="text"
            placeholder="Password 1"
            className="input2"
            onChange={(v) => setPassword1(v.target.value)}
          />
        </div>
        <div className="card3">
          <input
            type="text"
            placeholder="Password 2"
            className="input2"
            onChange={(v) => setPassword2(v.target.value)}
          />
        </div>

        <div className="card3">
          <input type="text" placeholder="Phone" className="input2" onChange={(v) => setPhone(v.target.value)} />
        </div>
        <div className="card3">
          <h1> </h1>
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

      <Container>
        <Card>
          <input type="text" placeholder="Search" className="input3" onChange={(v) => search(v.target.value)} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={USERLIST.length} />
                <TableBody>
                  {mainData.map((row, i) => {
                    return (
                      <TableRow hover key={i} tabIndex={-1} s>
                        <TableCell padding="checkbox"> </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {row.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">{row.order_info}</TableCell>

                        <TableCell align="center">{row.drop_of_place}</TableCell>
                        <TableCell align="center">{row.paymentMethod}</TableCell>

                        <TableCell align="center">{row.order_owner}</TableCell>

                        <TableCell align="center">
                          <Label color={(row.status === 'sending' && 'success') || 'error'}>
                            {sentenceCase(row.status)}
                          </Label>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
