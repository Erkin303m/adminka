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
import { AiOutlineArrowRight, AiOutlineShoppingCart, AiOutlineDropbox, AiOutlineArrowLeft } from 'react-icons/ai';
import { BiMoney } from 'react-icons/bi';
import { MdOutlineDone } from 'react-icons/md';
import { RiDeleteBack2Line } from 'react-icons/ri';
import swal from 'sweetalert';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Iconify from '../components/iconify';

import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Information about order', alignRight: false },
  { id: 'drop', label: 'Delivery point', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'relation', label: 'Connection', alignRight: false },
  { id: 'yesno', label: 'Yes/No', alignRight: false },
];

const TABLE_HEAD2 = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Driver', alignRight: false },
  { id: 'drop', label: 'Location', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'relation', label: 'Connection', alignRight: false },
  { id: 'yesno', label: 'Yes/No', alignRight: false },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserPage() {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [message, setMessage] = useState('');
  const [orderOwnerData, setOrderOwnerData] = useState([]);
  const [truckData, setTruckData] = useState([]);

  const [driver, setDriver] = useState('');
  const [drivers, setDrivers] = useState([]);

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

  const [mainData, setMainData] = useState([]);

  const [value, setValue] = useState(0);

  const navigation = useNavigate();
  const cat = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    getOrderOwner(0);
    getTruck(0);
    getDriver();
  }, []);

  // *****

  const getOrderOwner = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/order/?status=sending&limit=6&offset=${num}`, config)
      .then((ress) => {
        setOrderOwnerData(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const getTruck = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/?status=sending&limit=6&offset=${num}`, config)
      .then((ress) => {
        setTruckData(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };
  // *****

  const changinStatus = async (item, i, row) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    const id = get(row, 'id', 0);
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${id}/status_change/`,
        {
          status: item,
        },
        config
      )
      .then((ress) => {
        const a = [...mainData];
        a[i].status = item;
        setMainData(a);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const changeDriverLoaction = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${driver}/update_truck_location/`,
        {
          truck_location: message,
        },
        config
      )
      .then((ress) => {
        swal({
          title: 'Продукт успешно добавлен!',
          text: 'Ознакомьтесь с добавленным товаром в разделе Заявки',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error', err);
        swal({
          title: 'Информация введена неверно, проверьте интернет!',
          icon: 'error',
          dangerMode: true,
          timer: 3000,
        });
      });
  };

  const getDriver = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?driver=driver`, config)
      .then((ress) => {
        setDrivers(get(ress, 'data.results'));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const yes = async (row, i) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    const id = get(row, 'id', 0);
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${id}/status_change/`,
        {
          status: 'main',
        },
        config
      )
      .then(() => {
        const a = [...mainData];
        a[i].status = 'main';
        setMainData(a);

        swal({
          title: 'Success!',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const no = async (row, i) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    const id = get(row, 'id', 0);
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${id}/status_change/`,
        {
          status: 'declined',
        },
        config
      )
      .then(() => {
        const a = [...mainData];
        a[i].status = 'declined';
        setMainData(a);

        swal({
          title: 'Success!',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const handleOpen = (item) => {
    setOpen(true);
    setDataModal(item);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Helmet>
        <title> Request</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Request
          </Typography>
          <Card className="padding">
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Order owner" />
              <BottomNavigationAction label="Truck" />
            </BottomNavigation>
          </Card>
        </Stack>

        {/* Sending */}
        {value === 0 ? (
          <Card>
            <h1 className="center">Waiting</h1>
            {/* <input type="text" placeholder="Поиск" className="input3" onChange={(v) => search(v.target.value)} /> */}
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
                    {orderOwnerData.map((row, i) => {
                      return (
                        <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => handleOpen(row)}>
                          <TableCell component="th" scope="row" padding="none" className="nameProduct">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <p className="zayavkaName">{row.name}</p>
                            </Stack>
                          </TableCell>

                          <TableCell align="left" className="nameProduct">
                            {row.order_info}
                          </TableCell>

                          <TableCell align="left">{row.drop_of_place}</TableCell>

                          <TableCell align="left">{row.created_at.slice(0, 10)}</TableCell>

                          <TableCell align="left">
                            {get(cat, 'data.role', '') === 'dispatcher' ? (
                              <Label
                                color={
                                  (row.status === 'sending' && 'primary') ||
                                  (row.status === 'way' && 'warning') ||
                                  (row.status === 'arrived' && 'success') ||
                                  'error'
                                }
                              >
                                {sentenceCase(row.status)}
                              </Label>
                            ) : (
                              <select
                                name="cars"
                                id="cars"
                                defaultValue={row.status}
                                className={
                                  (row.status === 'sending' && 'primary') ||
                                  (row.status === 'way' && 'warning') ||
                                  (row.status === 'arrived' && 'success') ||
                                  'error'
                                }
                                onChange={(item) => changinStatus(item.target.value, i, row)}
                              >
                                <option disabled value="sending">
                                  Sending
                                </option>
                                <option disabled value="way">
                                  Way
                                </option>
                                <option disabled value="arrived">
                                  Arrived
                                </option>
                                {row.status === 'declined' ? (
                                  <option disabled value="declined">
                                    Declined
                                  </option>
                                ) : (
                                  <option value="declined">Declined</option>
                                )}
                              </select>
                            )}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              variant="contained"
                              onClick={() => navigation('/dashboard/blog', { state: { id: row.id, truck: false } })}
                            >
                              Connect
                            </Button>
                          </TableCell>

                          <TableCell align="left">
                            <Button className="yes" onClick={() => yes(row, i)}>
                              <MdOutlineDone />
                            </Button>
                            <Button className="no" onClick={() => no(row, i)}>
                              <RiDeleteBack2Line />
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

                  {orderOwnerData.length <= 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">Try use full words.</Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <div className="arrows">
              <Button
                onClick={() => {
                  if (number1 > 0) {
                    const a = number1 - 6;
                    setNumber1((pr) => pr - 6);
                    getOrderOwner(a);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number1 + 6;
                  setNumber1((pr) => pr + 6);
                  getOrderOwner(a);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Card>
        ) : null}

        {value === 1 ? (
          <Card>
            <h1 className="center">Waiting</h1>
            {/* <input type="text" placeholder="Поиск" className="input3" onChange={(v) => search(v.target.value)} /> */}
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
                    {truckData.map((row, i) => {
                      return (
                        <TableRow hover key={i} tabIndex={-1}>
                          <TableCell component="th" scope="row" padding="none" className="nameProduct">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <p className="zayavkaName">{row.name}</p>
                            </Stack>
                          </TableCell>

                          <TableCell align="left" className="nameProduct">
                            {row.driver.first_name}
                          </TableCell>

                          <TableCell align="left">{row.truck_location}</TableCell>

                          <TableCell align="left">{row.created_at.slice(0, 10)}</TableCell>

                          <TableCell align="left">
                            {get(cat, 'data.role', '') === 'dispatcher' ? (
                              <Label
                                color={
                                  (row.status === 'sending' && 'primary') ||
                                  (row.status === 'way' && 'warning') ||
                                  (row.status === 'arrived' && 'success') ||
                                  'error'
                                }
                              >
                                {sentenceCase(row.status)}
                              </Label>
                            ) : (
                              <select
                                name="cars"
                                id="cars"
                                disabled
                                defaultValue={row.status}
                                className={
                                  (row.status === 'sending' && 'primary') ||
                                  (row.status === 'way' && 'warning') ||
                                  (row.status === 'arrived' && 'success') ||
                                  'error'
                                }
                                onChange={(item) => changinStatus(item.target.value, i, row)}
                              >
                                <option value="sending">Ожидающий</option>
                                <option value="way">В пути</option>
                                <option value="arrived">Приехал</option>
                                {row.status === 'declined' ? (
                                  <option disabled value="declined">
                                    Отклоненный
                                  </option>
                                ) : (
                                  <option value="declined">Отклоненный</option>
                                )}
                              </select>
                            )}
                          </TableCell>

                          <TableCell align="left">
                            <Button
                              disabled
                              variant="contained"
                              onClick={() => navigation('/dashboard/blog', { state: { id: row.id, truck: true } })}
                            >
                              Connect
                            </Button>
                          </TableCell>

                          <TableCell align="left">
                            <Button className="yes" onClick={() => yes(row, i)}>
                              <MdOutlineDone />
                            </Button>
                            <Button className="no" onClick={() => no(row, i)}>
                              <RiDeleteBack2Line />
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

                  {truckData.length <= 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">Try use full words.</Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <div className="arrows">
              <Button
                onClick={() => {
                  if (number2 > 0) {
                    const a = number2 - 6;
                    setNumber2((pr) => pr - 6);
                    getTruck(a);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number2 + 6;
                  setNumber2((pr) => pr + 6);
                  getTruck(a);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Card>
        ) : null}

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="bigModalCard">
              <div className="cardMiniModal3">
                <p className="dateTitle">{get(dataModal, 'created_at', '').slice(0, 10)}</p>
                <Label
                  color={
                    (get(dataModal, 'status', '') === 'sending' && 'primary') ||
                    (get(dataModal, 'status', '') === 'way' && 'warning') ||
                    (get(dataModal, 'status', '') === 'arrived' && 'success') ||
                    'error'
                  }
                >
                  {get(dataModal, 'status', '')}
                </Label>
              </div>
              <div className="cardMiniModal">
                <p className="country">{get(dataModal, 'city_pending', '')}</p>
                <AiOutlineArrowRight />
                <p className="country">{get(dataModal, 'city_sending', '')}</p>
              </div>
              <p className="sum">
                <BiMoney /> {get(dataModal, 'full_payment', '')} USD
              </p>

              <div className="cardMiniModal2">
                <p className="productNameTitle">
                  <AiOutlineShoppingCart /> {get(dataModal, 'name', '')}
                </p>
                <p className="productNameTitle">
                  <AiOutlineDropbox /> {get(dataModal, 'packageMethod', '')}
                </p>
              </div>
              <p className="productNameTitle">{get(dataModal, 'customs[0].name', '')}</p>
              <div className="card2">
                <select
                  name="cars"
                  id="cars"
                  onChange={(v) => setDriver(v.target.value)}
                  placeholder="Drivers id"
                  className="input222"
                >
                  {drivers.map((v, i) => {
                    return (
                      <option key={i} value={get(v, 'id', 0)}>
                        {get(v, 'first_name', 0)} {get(v, 'last_name', 0)}
                      </option>
                    );
                  })}
                </select>
                <div className="card3">
                  <input
                    type="text"
                    placeholder="Location"
                    className="input222"
                    onChange={(v) => setMessage(v.target.value)}
                  />
                </div>
              </div>
              <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h4" gutterBottom>
                    {' '}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => changeDriverLoaction()}
                  >
                    Новый адрес
                  </Button>
                </Stack>
              </Container>
            </Box>
          </Modal>
        </div>
      </Container>
    </>
  );
}
