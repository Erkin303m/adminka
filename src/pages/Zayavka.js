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
import { useLocation } from 'react-router-dom';
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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function UserPage() {
  const location = useLocation();

  const [driver, setDriver] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [manager, setManager] = useState('');
  const [message, setMessage] = useState('');
  const [managerdata, setManagerdata] = useState([]);
  const [orderID, setOrderID] = useState(get(location, 'state.id', 0));
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
  const [number1, setNumber1] = useState(0);

  // **

  const cat = JSON.parse(localStorage.getItem('userData'));
  console.log(cat);

  // create order states
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
  const [fullPayment, setfullPayment] = useState('');
  const [countrySending, setCountrySending] = useState('');
  const [countryPending, setCountryPending] = useState('');
  const [citySending, setCitySending] = useState('');
  const [cityPending, setCityPending] = useState('');
  const [customs, setCustoms] = useState('');

  useEffect(() => {
    getDriver();
    getManager();
    getWay();
    getArrived();
    getDeclined();

    getWayTruck();
    getArrivedTruck();
    getDeclinedTruck();
  }, []);

  const sendData = async () => {
    console.log(driver, manager);
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${orderID}/add_truck_to_order/`,
        {
          driver,
          manager,
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

  const getTruck = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/?driver=${id}`, config)
      .then((ress) => {
        console.log('success getTruck', ress.data);
        setDriver(get(ress, 'data.results[0].id', 0));
      })
      .catch((err) => {
        console.log('error', err);
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
      .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?driver=driver`, config)
      .then((ress) => {
        setDrivers(get(ress, 'data.results'));
        console.log('getDriver', get(ress, 'data.results'));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const createOrder = async () => {
    const fCustoms = customs.split('');
    const ff = [];
    for (let i = 0; i < fCustoms.length; i += 1) {
      ff.push(parseInt(fCustoms[i], 10));
    }

    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/order/`,
        {
          name: userName,
          packageMethod: packages,
          paymentMethod: cash,
          first_payment: firstPayment,
          pending_of_place: waiting,
          drop_of_place: drop,
          order_owner: owner,
          full_payment: fullPayment,
          order_weight: massa,
          order_info: info,
          status,
          customs: ff,
          country,
          city,
          country_sending: countrySending,
          country_pending: countryPending,
          city_sending: citySending,
          city_pending: cityPending,
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
  const getManager = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?manager=manager`, config)
      .then((ress) => {
        setManagerdata(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  // ****
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
        console.log('zayavka way', ress.data);
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
        console.log(ress.data);
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
        console.log(ress.data);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };
  // ****

  // ****

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

  const search = (item) => {
    const a = mainData.filter((s) => {
      return s.name.toLowerCase().includes(item.toLowerCase());
    });
    setMainData(a);
  };
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
  const handleOpen = (item) => {
    setOpen(true);
    setDataModal(item);
  };
  const handleClose = () => setOpen(false);
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
        console.log('success changin status', ress);
        // setMainData(get(ress, 'data.results', ''));
        const a = [...mainData];
        a[i].status = item;
        setMainData(a);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  console.log(value, value2);
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
                    headLabel={TABLE_HEAD2}
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
                    {declinedData.map((row, i) => {
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
                        <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => handleOpen(row)}>
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
                    headLabel={TABLE_HEAD2}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {arrivedTruckData.map((row, i) => {
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
                    New address
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
