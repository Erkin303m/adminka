import { Helmet } from 'react-helmet-async';
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
import { get } from 'lodash';
import swal from 'sweetalert';
import { AiOutlineArrowRight, AiOutlineShoppingCart, AiOutlineDropbox, AiOutlineArrowLeft } from 'react-icons/ai';
import { BiMoney } from 'react-icons/bi';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
import Iconify from '../components/iconify';
import { UserListHead } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';

const TABLE_HEAD2 = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Information about order', alignRight: false },
  { id: 'drop', label: 'Delivery point', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

const TABLE_HEAD4 = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Information about order', alignRight: false },
  { id: 'drop', label: 'Delivery point', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'arrived', label: 'Arrived', alignRight: false },
];

const TABLE_HEAD3 = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Driver', alignRight: false },
  { id: 'drop', label: 'Location', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserPage() {
  const cat = JSON.parse(localStorage.getItem('userData'));

  const [driver, setDriver] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState([]);

  // **
  const [mainData2, setMainData2] = useState([]);
  const [mainData3, setMainData3] = useState([]);
  const [mainData4, setMainData4] = useState([]);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [mainData, setMainData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [open2, setOpen2] = useState(false);
  const [dataModal2, setDataModal2] = useState({});
  const [number1, setNumber1] = useState(0);
  // **

  // create order states
  // const [userName, setUserName] = useState('');
  // const [firstPayment, setFirstPayment] = useState('');
  // const [waiting, setWaiting] = useState('');
  // const [drop, setDrop] = useState('');
  // const [owner, setOwner] = useState('');
  // const [massa, setMassa] = useState('');
  // const [info, setInfo] = useState('');
  // const [status, setStatus] = useState('');
  // const [country, setCuntry] = useState('');
  // const [city, setCity] = useState('');
  // const [packages, setPackages] = useState('');
  // const [cash, setCash] = useState('');
  // const [fullPayment, setfullPayment] = useState('');
  // const [countrySending, setCountrySending] = useState('');
  // const [countryPending, setCountryPending] = useState('');
  // const [citySending, setCitySending] = useState('');
  // const [cityPending, setCityPending] = useState('');
  // const [customs, setCustoms] = useState('');

  useEffect(() => {
    getDriver();
    getWay();
    getArrived();
    getDeclined();

    getWayTruck();
    getArrivedTruck();
    getDeclinedTruck();
  }, []);

  const changeDriverLoaction = async () => {
    console.log('driver', driver);
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
        console.log('success', ress);
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
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/`, config)
      .then((ress) => {
        setDrivers(get(ress, 'data.results'));
        console.log('truklar', get(ress, 'data.results'));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  // ****
  // Orders
  const getWay = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/order/?status=way&limit=6&offset=${num}`, config)
      .then((ress) => {
        setMainData2(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const getArrived = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/order/?status=arrived&limit=6&offset=${num}`, config)
      .then((ress) => {
        setMainData3(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const getDeclined = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/order/?status=declined&limit=6&offset=${num}`, config)
      .then((ress) => {
        setMainData4(get(ress, 'data.results', ''));
        console.log('getDeclined', ress.data);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };
  // ****

  // ****
  // Trucks
  const [wayTruckData, setWayTruckData] = useState([]);
  const [arrivedTruckData, setArrivedTruckData] = useState([]);
  const [declinedData, setDeclinedData] = useState([]);
  const getWayTruck = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/?status=way&limit=6&offset=${num}`, config)
      .then((ress) => {
        setWayTruckData(get(ress, 'data.results', ''));
        console.log('getWayTruck', ress.data);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const getArrivedTruck = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/?status=arrived&limit=6&offset=${num}`, config)
      .then((ress) => {
        setArrivedTruckData(get(ress, 'data.results', ''));
        console.log('getArrivedTruck', ress.data);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const getDeclinedTruck = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/?status=declined&limit=6&offset=${num}`, config)
      .then((ress) => {
        setDeclinedData(get(ress, 'data.results', ''));
        console.log('getDeclinedTruck', ress.data);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };
  // ****
  const emptyRows = 1 > 0 ? Math.max(0, (1 + 0) * 5 - USERLIST.length) : 0;

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

  // 1-modal
  const handleOpen = (item) => {
    setOpen(true);
    setDataModal(item);
  };
  const handleClose = () => setOpen(false);

  // 2-modal

  const handleOpen2 = (item) => {
    setOpen2(true);
    setDataModal2(item);
  };
  const handleClose2 = () => setOpen2(false);

  const changinStatus = async (item, i, row) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    const id = get(row, 'id', 0);
    console.log(id);
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${id}/status_change/`,
        {
          status: item,
        },
        config
      )
      .then((ress) => {
        console.log('success changin status', ress);
        // setMainData(get(ress, 'data.results', ''));
        const a = [...mainData];
        a[i].status = item;
        setMainData(a);
        swal({
          title: 'Success changed!',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error zayavka', err);
        // swal({
        //   title: 'Error!',
        //   icon: 'error',
        //   dangerMode: false,
        //   timer: 3000,
        // });
      });
  };

  const changinStatusTruck = async (item, i, row) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    const id = get(row, 'id', 0);
    console.log(id);
    await axios
      .patch(
        `http://185.217.131.179:8888/api/v1/company/truck/${id}/`,
        {
          status: item,
        },
        config
      )
      .then((ress) => {
        console.log('success changin status', ress);
        swal({
          title: 'Success changed!',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error zayavka', err);
        swal({
          title: 'Error!',
          icon: 'error',
          dangerMode: false,
          timer: 3000,
        });
      });
  };

  const Arrived = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .patch(
        `http://185.217.131.179:8888/api/v1/company/dashboard/director/${id}/`,
        {
          status: 'item',
        },
        config
      )
      .then((ress) => {
        console.log('success changin status', ress);
        swal({
          title: 'Arrived!',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  return (
    <>
      <Helmet>
        <title> Application</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Application
          </Typography>
          <Card className="padding">
            <BottomNavigation
              showLabels
              value={value2}
              onChange={(event, newValue) => {
                setValue2(newValue);
              }}
            >
              <BottomNavigationAction label="Order owner" className="buttonNavigation" />
              <BottomNavigationAction label="Truck" />
            </BottomNavigation>

            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Way" />
              <BottomNavigationAction label="Arrived" />
              <BottomNavigationAction label="Declined" />
            </BottomNavigation>
          </Card>
        </Stack>

        {/* Way */}

        {value === 0 && value2 === 0 ? (
          <Card className="big_card">
            <h1 className="center">Way</h1>
            {/* <input type="text" placeholder="Поиск" className="input3" onChange={(v) => search(v.target.value)} /> */}
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    headLabel={TABLE_HEAD4}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {mainData2.map((row, i) => {
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
                            <select
                              name="cars2"
                              id="cars2"
                              defaultValue={row.status}
                              className={
                                (row.status === 'sending' && 'primary') ||
                                (row.status === 'way' && 'warning') ||
                                (row.status === 'arrived' && 'success') ||
                                'error'
                              }
                              onChange={(item) => changinStatus(item.target.value, i, row)}
                            >
                              <option value="way">Way</option>
                              <option value="arrived">Arrived</option>
                              {row.status === 'declined' ? (
                                <option disabled value="declined">
                                  Declined
                                </option>
                              ) : (
                                <option value="declined">Declined</option>
                              )}
                            </select>
                          </TableCell>

                          <TableCell align="left">
                            <Button onClick={() => Arrived(row.id)}>Arrived</Button>
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
                    getWay(a);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number1 + 6;
                  setNumber1((pr) => pr + 6);
                  getWay(a);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Card>
        ) : null}

        {/* Arrived */}

        {value === 1 && value2 === 0 ? (
          <Card className="big_card">
            <h1 className="center">Arrived</h1>
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
                    {mainData3.map((row, i) => {
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
                            <select
                              name="cars3"
                              id="cars3"
                              defaultValue={row.status}
                              className={
                                (row.status === 'sending' && 'primary') ||
                                (row.status === 'way' && 'warning') ||
                                (row.status === 'arrived' && 'success') ||
                                'error'
                              }
                              onChange={(item) => changinStatus(item.target.value, i, row)}
                            >
                              <option value="way">Way</option>
                              <option value="arrived">Arrived</option>
                              {row.status === 'declined' ? (
                                <option disabled value="declined">
                                  Declined
                                </option>
                              ) : (
                                <option value="declined">Declined</option>
                              )}
                            </select>
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
                    getArrived(a);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number1 + 6;
                  setNumber1((pr) => pr + 6);
                  getArrived(a);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Card>
        ) : null}

        {/* Declined */}

        {value === 2 && value2 === 0 ? (
          <Card className="big_card">
            <h1 className="center">Declined</h1>
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
                    {mainData4.map((row, i) => {
                      return (
                        <TableRow hover key={i} tabIndex={-1}>
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
                            <select
                              name="cars4"
                              id="cars4"
                              defaultValue={row.status}
                              className={
                                (row.status === 'sending' && 'primary') ||
                                (row.status === 'way' && 'warning') ||
                                (row.status === 'arrived' && 'success') ||
                                'error'
                              }
                              onChange={(item) => changinStatus(item.target.value, i, row)}
                            >
                              <option disabled value="declined">
                                Declined
                              </option>
                            </select>
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

                  {mainData4.length <= 0 && (
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
                    getDeclined(a);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number1 + 6;
                  setNumber1((pr) => pr + 6);
                  getDeclined(a);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Card>
        ) : null}

        {/* for Truck */}

        {/* Way */}

        {value === 0 && value2 === 1 ? (
          <Card className="big_card">
            <h1 className="center">Way</h1>
            {/* <input type="text" placeholder="Поиск" className="input3" onChange={(v) => search(v.target.value)} /> */}
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    headLabel={TABLE_HEAD3}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {wayTruckData.map((row, i) => {
                      return (
                        <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => handleOpen2(row)}>
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
                            <select
                              name="cars2"
                              id="cars2"
                              defaultValue={row.status}
                              className={
                                (row.status === 'sending' && 'primary') ||
                                (row.status === 'way' && 'warning') ||
                                (row.status === 'arrived' && 'success') ||
                                'error'
                              }
                              onChange={(item) => changinStatusTruck(item.target.value, i, row)}
                            >
                              <option value="way">Way</option>
                              <option value="arrived">Arrived</option>
                              {row.status === 'declined' ? (
                                <option disabled value="declined">
                                  Declined
                                </option>
                              ) : (
                                <option value="declined">Declined</option>
                              )}
                            </select>
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

                  {wayTruckData.length <= 0 && (
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
                    getWay(a);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number1 + 6;
                  setNumber1((pr) => pr + 6);
                  getWay(a);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Card>
        ) : null}

        {/* Arrived */}

        {value === 1 && value2 === 1 ? (
          <Card className="big_card">
            <h1 className="center">Arrived</h1>
            {/* <input type="text" placeholder="Поиск" className="input3" onChange={(v) => search(v.target.value)} /> */}
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    headLabel={TABLE_HEAD3}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {arrivedTruckData.map((row, i) => {
                      return (
                        <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => handleOpen2(row)}>
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
                            <select
                              name="cars2"
                              id="cars2"
                              defaultValue={row.status}
                              className={
                                (row.status === 'sending' && 'primary') ||
                                (row.status === 'way' && 'warning') ||
                                (row.status === 'arrived' && 'success') ||
                                'error'
                              }
                              onChange={(item) => changinStatusTruck(item.target.value, i, row)}
                            >
                              <option value="way">Way</option>
                              <option value="arrived">Arrived</option>
                              {row.status === 'declined' ? (
                                <option disabled value="declined">
                                  Declined
                                </option>
                              ) : (
                                <option value="declined">Declined</option>
                              )}
                            </select>
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

                  {arrivedTruckData.length <= 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not Found
                            </Typography>
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
                    getArrived(a);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number1 + 6;
                  setNumber1((pr) => pr + 6);
                  getArrived(a);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Card>
        ) : null}

        {/* Declined */}

        {value === 2 && value2 === 1 ? (
          <Card className="big_card">
            <h1 className="center">Declined</h1>
            {/* <input type="text" placeholder="Поиск" className="input3" onChange={(v) => search(v.target.value)} /> */}
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    headLabel={TABLE_HEAD3}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {declinedData.map((row, i) => {
                      return (
                        <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => handleOpen2(row)}>
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
                            <select
                              name="cars2"
                              id="cars2"
                              defaultValue={row.status}
                              className={
                                (row.status === 'sending' && 'primary') ||
                                (row.status === 'way' && 'warning') ||
                                (row.status === 'arrived' && 'success') ||
                                'error'
                              }

                              // onChange={(item) => changinStatusTruck(item.target.value, i, row)}
                            >
                              <option value="way">Way</option>
                              <option value="arrived">Arrived</option>
                              {row.status === 'declined' ? (
                                <option disabled value="declined">
                                  Declined
                                </option>
                              ) : (
                                <option value="declined">Declined</option>
                              )}
                            </select>
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

                  {declinedData.length <= 0 && (
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
                    getDeclinedTruck(a);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number1 + 6;
                  setNumber1((pr) => pr + 6);
                  getDeclinedTruck(a);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Card>
        ) : null}

        {/* 1-modal */}
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
              <div className="cardLocation">
                <select
                  name="cars"
                  id="cars"
                  onChange={(v) => setDriver(v.target.value)}
                  placeholder="Drivers id"
                  className="inputLocation"
                >
                  <option selected value='0'>
                    Choose Truck
                  </option>
                  {drivers.map((v, i) => {
                    return (
                      <option key={i} value={get(v, 'id', 0)}>
                        {get(v, 'name', '')}
                      </option>
                    );
                  })}
                </select>

                <div className="card3">
                  <input
                    type="text"
                    placeholder="Location"
                    className="inputLocation"
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
                    New address
                  </Button>
                </Stack>
              </Container>
            </Box>
          </Modal>
        </div>

        {/* 2-modal */}

        <div>
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="bigModalCard">
              <div className="cardMiniModal3">
                {get(dataModal2, 'name', '')}

                <Label
                  color={
                    (get(dataModal2, 'status', '') === 'sending' && 'primary') ||
                    (get(dataModal2, 'status', '') === 'way' && 'warning') ||
                    (get(dataModal2, 'status', '') === 'arrived' && 'success') ||
                    'error'
                  }
                >
                  {get(dataModal2, 'status', '')}
                </Label>
              </div>
              <div className="cardMiniModal">
                <p className="country">Driver: </p>
                <p className="country">
                  {get(dataModal2, 'driver.first_name', '')} {get(dataModal2, 'driver.last_name', '')}
                </p>
              </div>

              <div className="cardMiniModal">
                <p className="country">Phone Number: </p>
                <p className="country">{get(dataModal2, 'driver.phone_number', '')} </p>
              </div>
              <div className="cardMiniModal">
                <p className="country">Location: </p>
                <p className="country">{get(dataModal2, 'truck_location', '')} </p>
              </div>
              <div className="cardMiniModal">
                <p className="country">Date: </p>
                <p className="country">{get(dataModal2, 'created_at', '').slice(0, 10)} </p>
              </div>

              <div className="cardMiniModal22">
                <p className="center">Comment</p>
                <p className="sum">{get(dataModal2, 'truck_type.comment', '')}</p>
              </div>
              <p className="productNameTitle">{get(dataModal2, 'customs[0].name', '')}</p>
            </Box>
          </Modal>
        </div>
      </Container>
    </>
  );
}
