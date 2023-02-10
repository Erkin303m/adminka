import { Helmet } from 'react-helmet-async';
import { get } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillCar } from 'react-icons/ai';
import { BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';
import { w3cwebsocket as Socket } from 'websocket';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'lastName', label: 'last_name', alignRight: false },
  { id: 'number', label: 'Number', alignRight: false },
  { id: 'user', label: 'User', alignRight: false },
  { id: 'status', label: 'Чат', alignRight: false },
];

const TABLE_HEAD2 = [
  { id: 'name2', label: 'Room ID', alignRight: false },
  { id: 'number2', label: 'Number', alignRight: false },
  { id: 'send', label: 'Продолжать', alignRight: false },
];

export default function UserPage() {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [mainData, setMainData] = useState([]);
  const [mainData2, setMainData2] = useState([]);
  const [mainData3, setMainData3] = useState([]);

  const [value, setValue] = useState(0);

  const cat = JSON.parse(localStorage.getItem('userData'));
  const socket = new Socket(`ws://185.217.131.179:8004/chat/?token=${get(cat, 'access', '')}`);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const emptyRows = 1 > 0 ? Math.max(0, (1 + 0) * 5 - USERLIST.length) : 0;

  const navigation = useNavigate();

  useEffect(() => {
    getDriver();
    getOrderOwner();
    socket.onopen = (data) => {
      console.log('ulanish: ', data);
    };
    socket.onmessage = (data) => {
      const someData = JSON.parse(data.data);
      console.log('Oldin kim bilan yozishgan', someData);
      setMainData3(get(someData, 'data', []));
    };
    socket.close = () => {};
  }, []);

  const getDriver = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?driver=driver`, config)
      .then((ress) => {
        setMainData(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const getOrderOwner = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?order_owner=order_owner`, config)
      .then((ress) => {
        setMainData2(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const search = (item) => {
    const a = mainData.filter((s) => {
      return s.name.toLowerCase().includes(item.toLowerCase());
    });
    setMainData(a);
  };

  const createRoom = (i) => {
    socket.send(
      JSON.stringify({
        action: 'create_room',
        request_id: Math.random() * 1000000000,
        members: [i],
        is_gruop: false,
      })
    );
  };

  const isDeleting = (i) => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(i);
      } else if (result.isDenied) {
        Swal.fire('Room is not deleted', '', 'info');
      }
    });
  };

  const deleteItem = (i) => {
    socket.send(
      JSON.stringify({
        action: 'delete_room',
        pk: i,
        request_id: 1675870311523,
      })
    );
  };

  return (
    <>
      <Helmet>
        <title>Чат</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Чат
          </Typography>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Водитель" icon={<AiFillCar />} />
            <BottomNavigationAction label="Владельцы заказов" icon={<BsFillPersonFill />} />
            {/* <BottomNavigationAction label="Rooms" icon={<BsPeopleFill />} /> */}
          </BottomNavigation>
        </Stack>

        {value === 0 ? (
          <Card className="driverCard">
            <input type="text" placeholder="Водитель" className="input3" onChange={(v) => search(v.target.value)} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {mainData.map((row, i) => {
                      return (
                        <TableRow hover key={i} tabIndex={-1}>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" className="zayavkaName">
                                {row.id}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{row.first_name}</TableCell>

                          <TableCell align="left">{row.last_name}</TableCell>
                          <TableCell align="left">{row.phone_number}</TableCell>

                          <TableCell align="left">{row.user}</TableCell>

                          <TableCell align="left">
                            <Button onClick={() => createRoom(row.user)}>Начинать</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {mainData.length <= 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Не найден
                            </Typography>

                            <Typography variant="body2">
                              Попробуйте проверить на опечатки или использовать полные слова.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        ) : null}

        {value === 1 ? (
          <Card>
            <input
              type="text"
              placeholder="Search order owner"
              className="input3"
              onChange={(v) => search(v.target.value)}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {mainData2.map((row, i) => {
                      return (
                        <TableRow hover key={i} tabIndex={-1}>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" className="zayavkaName">
                                {row.id}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{row.first_name}</TableCell>

                          <TableCell align="left">{row.last_name}</TableCell>
                          <TableCell align="left">{row.phone_number}</TableCell>

                          <TableCell align="left">{row.user}</TableCell>

                          <TableCell align="left">
                            <Button onClick={() => createRoom(row.user)}>Начинать</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {mainData2.length <= 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Не найден
                            </Typography>

                            <Typography variant="body2">
                              Попробуйте проверить на опечатки или использовать полные слова.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        ) : null}

        <h1>Люди, которые писали раньше</h1>

        <Card>
          <input type="text" placeholder="Search Rooms" className="input3" onChange={(v) => search(v.target.value)} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  headLabel={TABLE_HEAD2}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {mainData3.map((row, i) => {
                    return (
                      <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => isDeleting(row.roomId)}>
                        <TableCell align="left">{row.roomId}</TableCell>
                        <TableCell align="left">{row.roomName}</TableCell>
                        <TableCell align="left">
                          <Button
                            onClick={() => {
                              // socket.onclose = () => {};

                              navigation('/dashboard/mainChat', { state: { item: row, isWrited: 1 } });
                            }}
                          >
                            Продолжать
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {mainData2.length <= 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Не найден
                          </Typography>

                          <Typography variant="body2">
                            Попробуйте проверить на опечатки или использовать полные слова.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
