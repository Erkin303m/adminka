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
import { AiFillCar, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';

import { w3cwebsocket as Socket } from 'websocket';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function UserPage() {
  const { t } = useTranslation();
  const TABLE_HEAD = [
    { id: 'id', label: t('ID'), alignRight: false },
    // { id: 'name', label: t('Name'), alignRight: false },
    // { id: 'lastName', label: t('Last name'), alignRight: false },
    { id: 'number', label: t('Number'), alignRight: false },
    // { id: 'user', label: t('User'), alignRight: false },
    { id: 'status', label: t('Chat'), alignRight: false },
  ];

  const TABLE_HEAD2 = [
    { id: 'name2', label: t('Room ID'), alignRight: false },
    { id: 'number2', label: t('Number'), alignRight: false },
    { id: 'send', label: t('Continue'), alignRight: false },
  ];
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [mainData, setMainData] = useState([]);
  const [mainData2, setMainData2] = useState([]);
  const [mainData3, setMainData3] = useState([]);
  const [oneTouch, setOneTouch] = useState(0);

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
      socket.close = () => {};
    };

    socket.onmessage = (data) => {
      const someData = JSON.parse(data.data);
      console.log('Oldin kim bilan yozishgan', someData);
      if (get(someData, 'action') === 'rooms') {
        setMainData3((pr) => [...pr, ...get(someData, 'data', [])]);
      } else if (get(someData, 'action', '') === '_create_room') {
        console.log('1111111111');
        setMainData3((pr) => [...pr, get(someData, 'data', [])]);
      }
    };
  }, [oneTouch]);

  const getDriver = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/chat/rooms/get_user_for_room/`, config)
      .then((ress) => {
        setMainData(get(ress, 'data', []));
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
      .get(`http://185.217.131.179:8888/chat/rooms/get_user_for_room/`, config)
      .then((ress) => {
        setMainData2(get(ress, 'data', []));
        console.log('order owner', ress.data);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const createRoom = (i) => {
    setOneTouch(1);
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Helmet>
        <title>{t('Chat')}</title>
      </Helmet>

      <Container>
        <div className='plusCard'>
          <h1>{t('People who have written before')}</h1>
          <Button className='btnPlus' onClick={() => handleOpen()}>
            <AiOutlinePlusCircle />
          </Button>
        </div>

        <Card>
          {/* <input type="text" placeholder="Search Rooms" className="input3" onChange={(v) => search(v.target.value)} /> */}

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
                      <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => isDeleting(get(row, 'roomId', ''))}>
                        <TableCell align="left">{get(row, 'roomId', '')}</TableCell>
                        <TableCell align="left">{get(row, 'roomName', '')}</TableCell>
                        <TableCell align="left">
                          <Button
                            onClick={() => {
                              navigation('/dashboard/mainChat', { state: { item: row, isWrited: 1 } });
                            }}
                          >
                            {t('Chat')}
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

                {mainData3.length <= 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            {t('Not Found')}
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

      {/* 2-modal */}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="bigModalCard">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {t('Chat')}
              </Typography>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction label={t('Drivers')} icon={<AiFillCar />} />
                <BottomNavigationAction label={t('Order owners')} icon={<BsFillPersonFill />} />
                {/* <BottomNavigationAction label="Rooms" icon={<BsPeopleFill />} /> */}
              </BottomNavigation>
            </Stack>
            {value === 1 ? (
              <Card>
                <Scrollbar>
                  <TableContainer sx={{ minWidth: 500 }}>
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
                            <TableRow
                              hover
                              key={i}
                              tabIndex={-1}
                              className={get(row, 'role', '') === 'order_owner' ? '' : 'none'}
                            >
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" className="zayavkaName">
                                    {row.id}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              {/* <TableCell align="left">{row.first_name}</TableCell>

                          <TableCell align="left">{row.last_name}</TableCell> */}
                              <TableCell align="left">{row.phone_number}</TableCell>

                              {/* <TableCell align="left">{row.user}</TableCell> */}

                              <TableCell align="left">
                                <Button onClick={() => createRoom(row.user)}>{t('Create Room')}</Button>
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
                                  {t('Not found')}
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
            {value === 0 ? (
              <Card className="driverCard">
                <Scrollbar>
                  <TableContainer sx={{ minWidth: 500 }}>
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
                            <TableRow
                              hover
                              key={i}
                              tabIndex={-1}
                              className={get(row, 'role', '') === 'driver' ? '' : 'none'}
                            >
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" className="zayavkaName">
                                    {get(row, 'id', '')}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              {/* 
                          <TableCell align="left"> {get(row, 'first_name', '')}</TableCell>

                          <TableCell align="left"> {get(row, 'last_name', '')}</TableCell> */}
                              <TableCell align="left"> {get(row, 'phone_number', '')}</TableCell>

                              {/* <TableCell align="left"> {get(row, 'user', '')}</TableCell> */}

                              <TableCell align="left">
                                <Button onClick={() => createRoom(row.user)}>{t('Create Room')}</Button>
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
                                  {t('Not found')}
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
            <p className="productNameTitle">{t('New chat')}</p>
          </Box>
        </Modal>
      </div>
    </>
  );
}
